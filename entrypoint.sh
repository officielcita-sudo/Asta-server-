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
USE_AIKAR_FLAGS="${USE_AIKAR_FLAGS:-false}"
JVM_DD_OPTS="${JVM_DD_OPTS:-}"
ENABLE_AUTOPAUSE="${ENABLE_AUTOPAUSE:-false}"
ENABLE_ROLLING_LOGS="${ENABLE_ROLLING_LOGS:-false}"

log() {
  printf '%s\n' "$*"
}

is_true() {
  value="$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]')"
  [ "$value" = "true" ] || [ "$value" = "1" ] || [ "$value" = "yes" ]
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

if [ ! -f "$SERVER_DIR/.initialized" ]; then
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

exec sh -c "java ${JAVA_OPTS:-} ${QUERY_FLAG} ${JAVA_MEMORY_ARGS} ${DD_FLAGS} ${AIKAR_FLAGS} ${AUX_JVM_ARGS} -jar ${FORGE_JAR} nogui"
