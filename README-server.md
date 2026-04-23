# Stoneblock 2 Dedicated Server

This folder now includes a dedicated Forge server built from the Stoneblock 2 client export and your `7ajar` world.

## Local Windows

Run:

```bat
server\start-server.bat
```

If Java 8 is not on your machine, set `JAVA8_HOME` first or pass `-JavaPath` to [start-server.ps1](C:\Users\astam\Downloads\FTB Presents Stoneblock 2\FTB Presents Stoneblock 2\server\start-server.ps1).
The batch launcher already auto-confirms the missing client-only registry entries this converted world needs on dedicated-server startup.

## Railway

1. Deploy this folder with the included `Dockerfile`.
2. Attach a persistent volume at `/data`.
3. Create a TCP Proxy that targets internal port `25565`.
4. Use the TCP proxy host and port in Minecraft, not the `https://...up.railway.app/` URL.
5. Keep sleep/serverless disabled so the server stays online for players.

Supported env vars in this custom image:

- `EULA`
- `MOTD`
- `MAX_MEMORY`
- `INIT_MEMORY`
- `MAX_TICK_TIME`
- `JVM_DD_OPTS`
- `USE_AIKAR_FLAGS`
- `MC_PORT`
- `LEVEL_NAME`
- `ONLINE_MODE`
- `MAX_PLAYERS`
- `DIFFICULTY`

Template-only vars such as `ENABLE_AUTOPAUSE`, `AUTOPAUSE_TIMEOUT_EST`, `AUTOPAUSE_TIMEOUT_INIT`, and `EXISTING_OPS_FILE` are not fully implemented by this custom image.

## Notes

- The first dedicated-server boot already completed successfully with this world.
- Forge created a backup named `world-20260423-141925.zip` when it remapped a few missing client-side sound entries.
- Some client-only mods still show as "missing" in startup logs. That is expected when converting a client save into a dedicated server and did not stop the server from reaching `Done`.
