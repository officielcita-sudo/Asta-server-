# Asta Stoneblock 2 Server

Dedicated Forge `1.12.2` server for `FTB Presents Stoneblock 2`, prepared for local Windows startup and Railway Docker deployment.

## What is included

- Prebuilt Forge server for `14.23.5.2846`
- Modpack mods, configs, scripts, and shared resources
- Existing `7ajar` world copied into `server/world`
- Windows launchers in `server/start-server.bat` and `server/start-server.ps1`
- Docker/Railway files in the repo root

## Run locally

```bat
server\start-server.bat
```

Java 8 is required locally.

## Deploy on Railway

1. Deploy this repository with the included `Dockerfile`.
2. Mount a persistent volume at `/data`.
3. Create a TCP proxy to internal port `25565`.
4. Join with the Railway TCP proxy `host:port`, not the HTTPS web URL.

See [README-server.md](README-server.md) for the fuller setup notes.
