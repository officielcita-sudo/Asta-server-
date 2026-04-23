FROM eclipse-temurin:8-jre-jammy

WORKDIR /opt/server-template

COPY server/ /opt/server-template/
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 25565/tcp
VOLUME ["/data"]

ENTRYPOINT ["/entrypoint.sh"]
