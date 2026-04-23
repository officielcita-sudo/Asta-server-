#!/bin/sh
set -eu

TEMPLATE_DIR="/opt/server-template"
SERVER_DIR="${SERVER_DIR:-/data}"
FORGE_JAR="forge-1.12.2-14.23.5.2846-universal.jar"
MC_PORT="${MC_PORT:-25565}"
LEVEL_NAME="${LEVEL_NAME:-world}"
MOTD="${MOTD:-FTB Presents Stoneblock 2}"
ONLINE_MODE="${ONLINE_MODE:-true}"
MAX_PLAYERS="${MAX_PLAYERS:-20}"
DIFFICULTY="${DIFFICULTY:-1}"
MAX_TICK_TIME="${MAX_TICK_TIME:--1}"
EULA_VALUE="${EULA:-false}"
TYPE_VALUE="${TYPE:-Forge}"
MAX_MEMORY="${MAX_MEMORY:-4G}"
INIT_MEMORY="${INIT_MEMORY:-2G}"
MEMORY_HEADROOM_MB="${MEMORY_HEADROOM_MB:-1536}"
USE_AIKAR_FLAGS="${USE_AIKAR_FLAGS:-false}"
JVM_DD_OPTS="${JVM_DD_OPTS:-}"
ENABLE_AUTOPAUSE="${ENABLE_AUTOPAUSE:-false}"
ENABLE_ROLLING_LOGS="${ENABLE_ROLLING_LOGS:-false}"
FORCE_REINITIALIZE="${FORCE_REINITIALIZE:-false}"
ENABLE_RCON="${ENABLE_RCON:-false}"
RCON_PORT="${RCON_PORT:-25575}"
RCON_PASSWORD="${RCON_PASSWORD:-}"
BROADCAST_RCON_TO_OPS="${BROADCAST_RCON_TO_OPS:-true}"

log() {
  printf '%s\n' "$*"
}

is_true() {
  value="$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]')"
  [ "$value" = "true" ] || [ "$value" = "1" ] || [ "$value" = "yes" ]
}

memory_spec_to_mb() {
  spec="$(printf '%s' "$1" | tr '[:lower:]' '[:upper:]')"
  case "$spec" in
    *G)
      echo $(( ${spec%G} * 1024 ))
      ;;
    *M)
      echo $(( ${spec%M} ))
      ;;
    *K)
      echo $(( ${spec%K} / 1024 ))
      ;;
    *)
      echo $(( spec ))
      ;;
  esac
}

mb_to_spec() {
  value_mb="$1"
  if [ $(( value_mb % 1024 )) -eq 0 ]; then
    echo "$(( value_mb / 1024 ))G"
  else
    echo "${value_mb}M"
  fi
}

detect_memory_limit_mb() {
  for candidate in /sys/fs/cgroup/memory.max /sys/fs/cgroup/memory/memory.limit_in_bytes; do
    if [ -f "$candidate" ]; then
      raw="$(cat "$candidate" 2>/dev/null || true)"
      case "$raw" in
        ""|max)
          continue
          ;;
      esac

      limit_mb=$(( raw / 1024 / 1024 ))
      if [ "$limit_mb" -gt 0 ] && [ "$limit_mb" -lt 1048576 ]; then
        echo "$limit_mb"
        return 0
      fi
    fi
  done

  return 1
}

auto_tune_memory() {
  requested_max_mb="$(memory_spec_to_mb "$MAX_MEMORY")"
  requested_init_mb="$(memory_spec_to_mb "$INIT_MEMORY")"
  limit_mb="$(detect_memory_limit_mb || true)"

  if [ -n "$limit_mb" ]; then
    headroom_mb="$MEMORY_HEADROOM_MB"
    if [ "$headroom_mb" -lt 1024 ]; then
      headroom_mb=1024
    fi

    safe_max_mb=$(( limit_mb - headroom_mb ))
    if [ "$safe_max_mb" -lt 1024 ]; then
      safe_max_mb=1024
    fi

    if [ "$requested_max_mb" -gt "$safe_max_mb" ]; then
      original_max="$MAX_MEMORY"
      MAX_MEMORY="$(mb_to_spec "$safe_max_mb")"
      requested_max_mb="$safe_max_mb"
      log "Clamped MAX_MEMORY from $original_max to $MAX_MEMORY to stay under the container memory limit (${limit_mb}M)."
    fi

    if [ "$requested_init_mb" -gt "$requested_max_mb" ]; then
      INIT_MEMORY="$(mb_to_spec "$requested_max_mb")"
    fi
  elif [ "$requested_max_mb" -ge 7168 ]; then
    log "MAX_MEMORY=$MAX_MEMORY is high for a hosted container and can cause OOM kills. 6G is a safer value on an 8 GB replica."
  fi
}

set_prop() {
  key="$1"
  value="$2"
  file="$3"

  if grep -q "^${key}=" "$file"; then
    sed -i "s/^${key}=.*/${key}=${value}/" "$file"
  else
    printf '%s=%s\n' "$key" "$value" >> "$file"
  fi
}

mkdir -p "$SERVER_DIR"

case "$SERVER_DIR" in
  ""|"/")
    echo "Refusing to use SERVER_DIR=$SERVER_DIR" >&2
    exit 1
    ;;
esac

if is_true "$FORCE_REINITIALIZE" && [ -f "$SERVER_DIR/.initialized" ]; then
  log "FORCE_REINITIALIZE=true, replacing persisted server data from the image template."
  find "$SERVER_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
fi

if [ ! -f "$SERVER_DIR/.initialized" ]; then
  log "Initializing persistent server data in $SERVER_DIR"
  cp -a "$TEMPLATE_DIR"/. "$SERVER_DIR"/
  touch "$SERVER_DIR/.initialized"
fi

cd "$SERVER_DIR"

if [ ! -f "$FORGE_JAR" ]; then
  echo "Missing $FORGE_JAR in $SERVER_DIR" >&2
  exit 1
fi

if ! is_true "$EULA_VALUE"; then
  echo "EULA must be set to true for the server to start." >&2
  exit 1
fi

cat > eula.txt <<'EOF'
# By changing the setting below to TRUE you are indicating your agreement to the EULA
# (https://aka.ms/MinecraftEULA).
eula=true
EOF

set_prop "server-port" "$MC_PORT" "server.properties"
set_prop "level-name" "$LEVEL_NAME" "server.properties"
set_prop "motd" "$MOTD" "server.properties"
set_prop "online-mode" "$ONLINE_MODE" "server.properties"
set_prop "max-players" "$MAX_PLAYERS" "server.properties"
set_prop "difficulty" "$DIFFICULTY" "server.properties"
set_prop "max-tick-time" "$MAX_TICK_TIME" "server.properties"

if is_true "$ENABLE_RCON"; then
  if [ -z "$RCON_PASSWORD" ]; then
    echo "ENABLE_RCON=true but RCON_PASSWORD is empty." >&2
    exit 1
  fi

  set_prop "enable-rcon" "true" "server.properties"
  set_prop "rcon.port" "$RCON_PORT" "server.properties"
  set_prop "rcon.password" "$RCON_PASSWORD" "server.properties"
  set_prop "broadcast-rcon-to-ops" "$BROADCAST_RCON_TO_OPS" "server.properties"
  log "RCON enabled on port $RCON_PORT"
else
  set_prop "enable-rcon" "false" "server.properties"
fi

AUX_JVM_ARGS=""
if [ -f "user_jvm_args.txt" ]; then
  while IFS= read -r line || [ -n "$line" ]; do
    trimmed="$(printf '%s' "$line" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    case "$trimmed" in
      ""|\#*)
        continue
        ;;
      -Xms*|-Xmx*)
        continue
        ;;
      -XX:*)
        if is_true "$USE_AIKAR_FLAGS"; then
          continue
        fi
        ;;
    esac
    AUX_JVM_ARGS="$AUX_JVM_ARGS $trimmed"
  done < "user_jvm_args.txt"
fi

QUERY_FLAG=""
if [ -n "${FML_QUERY_RESULT:-confirm}" ]; then
  QUERY_FLAG="-Dfml.queryResult=${FML_QUERY_RESULT:-confirm}"
fi

auto_tune_memory
JAVA_MEMORY_ARGS="-Xms${INIT_MEMORY} -Xmx${MAX_MEMORY}"
AIKAR_FLAGS=""
if is_true "$USE_AIKAR_FLAGS"; then
  AIKAR_FLAGS="\
-XX:+UseG1GC \
-XX:+ParallelRefProcEnabled \
-XX:MaxGCPauseMillis=200 \
-XX:+UnlockExperimentalVMOptions \
-XX:+DisableExplicitGC \
-XX:+AlwaysPreTouch \
-XX:G1NewSizePercent=30 \
-XX:G1MaxNewSizePercent=40 \
-XX:G1HeapRegionSize=8M \
-XX:G1ReservePercent=20 \
-XX:G1HeapWastePercent=5 \
-XX:G1MixedGCCountTarget=4 \
-XX:InitiatingHeapOccupancyPercent=15 \
-XX:G1MixedGCLiveThresholdPercent=90 \
-XX:G1RSetUpdatingPauseTimePercent=5 \
-XX:SurvivorRatio=32 \
-XX:+PerfDisableSharedMem \
-XX:MaxTenuringThreshold=1 \
-Daikars.new.flags=true"
fi

DD_FLAGS=""
OLD_IFS="$IFS"
IFS=', '
for raw_opt in $JVM_DD_OPTS; do
  [ -n "$raw_opt" ] || continue
  case "$raw_opt" in
    -D*)
      DD_FLAGS="$DD_FLAGS $raw_opt"
      ;;
    *=*)
      DD_FLAGS="$DD_FLAGS -D${raw_opt}"
      ;;
    *:*)
      DD_FLAGS="$DD_FLAGS -D${raw_opt%%:*}=${raw_opt#*:}"
      ;;
    *)
      DD_FLAGS="$DD_FLAGS -D${raw_opt}=true"
      ;;
  esac
done
IFS="$OLD_IFS"

type_lower="$(printf '%s' "$TYPE_VALUE" | tr '[:upper:]' '[:lower:]')"
if [ "$type_lower" != "forge" ]; then
  log "Ignoring TYPE=$TYPE_VALUE because this image is pinned to Forge Stoneblock 2."
fi

if is_true "$ENABLE_AUTOPAUSE"; then
  log "ENABLE_AUTOPAUSE is not implemented by this custom image; use Railway service settings if you want sleeping behavior."
fi

if is_true "$ENABLE_ROLLING_LOGS"; then
  log "ENABLE_ROLLING_LOGS is handled by Forge/log4j for this server pack."
fi

log "Starting Stoneblock 2 Forge server with heap ${INIT_MEMORY}/${MAX_MEMORY} on port $MC_PORT"
exec sh -c "java ${JAVA_OPTS:-} ${QUERY_FLAG} ${JAVA_MEMORY_ARGS} ${DD_FLAGS} ${AIKAR_FLAGS} ${AUX_JVM_ARGS} -jar ${FORGE_JAR} nogui"
