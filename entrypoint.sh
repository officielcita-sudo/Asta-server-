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

set_prop "server-port" "$MC_PORT" "server.properties"
set_prop "level-name" "$LEVEL_NAME" "server.properties"
set_prop "motd" "$MOTD" "server.properties"
set_prop "online-mode" "$ONLINE_MODE" "server.properties"
set_prop "max-players" "$MAX_PLAYERS" "server.properties"
set_prop "difficulty" "$DIFFICULTY" "server.properties"

USER_JVM_ARGS=""
if [ -f "user_jvm_args.txt" ]; then
  USER_JVM_ARGS="$(grep -v '^[[:space:]]*#' user_jvm_args.txt | tr '\n' ' ' | xargs || true)"
fi

QUERY_FLAG=""
if [ -n "${FML_QUERY_RESULT:-confirm}" ]; then
  QUERY_FLAG="-Dfml.queryResult=${FML_QUERY_RESULT:-confirm}"
fi

exec sh -c "java ${JAVA_OPTS:-} ${QUERY_FLAG} ${USER_JVM_ARGS} -jar ${FORGE_JAR} nogui"
