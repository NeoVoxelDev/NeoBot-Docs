# Plugin Installation Guide

This document explains the installation and basic configuration steps for the NeoBot plugin on common Minecraft servers, suitable for Paper / Purpur / Leaf and other Bukkit-based servers.

## Prerequisites

- Java Runtime Environment: Java 17 or higher is recommended (consistent with the server version).
- A ready-to-run Minecraft server (Paper, Leaves, etc.).
- Read/write permissions for the server folder and the ability to restart/start the server.
- If you need to connect to chat platforms (QQ/Discord/Telegram/Kook), you need to apply for a bot Token / API Key on the corresponding platform in advance and record it (QQ bot is not yet adapted, only Onebot11).

## Download Plugin

1. Download the latest version of the NeoBot plugin JAR from the official repository or Releases page (e.g., NeoBot-V3.jar).
2. Confirm that the downloaded version is compatible with the current server (Minecraft and server API versions).

::: tip Friendly Tip
You can download the latest version of the NeoBot plugin below:

<DownloadEN />
:::

## Installation Steps

1. Copy the plugin JAR to the `plugins` folder in the server root directory:
   - Windows example (in the server root directory): Copy `NeoBot-version.jar` to `plugins\`.
2. Start or restart the server:
   - Through the startup script (Windows: `start.bat` / Linux: `start.sh`), or run in the command line:
     ```bash
     java -Xms1G -Xmx2G -jar [replace with your server core].jar nogui
     ```
3. After startup, the plugin will generate default configuration files and initial data in `plugins/NeoBot/` (or the directory corresponding to the plugin name).

## Basic Configuration (Example)

1. Open the configuration file in the plugin directory, usually `plugins/NeoBot/config.yml` or `config.yml`.
2. Fill in the platform connection information as needed (this is an example snippet, please modify according to actual configuration items):
   ```yaml
   # filepath: plugins/NeoBot/config.yml
   bot:
     qq:
       enabled: true
       token: "YOUR_QQ_BOT_TOKEN"
     discord:
       enabled: true
       token: "YOUR_DISCORD_BOT_TOKEN"
     telegram:
       enabled: false
       token: ""
     kook:
       enabled: false
       token: ""
   server:
     bind-ip: "0.0.0.0"
     port: 25565
   ```
3. Save and close the configuration file.

## Testing and Verification

1. After starting the server, check if the plugin is loaded normally (console output).
2. Test basic functions (such as sending messages, getting player information, etc.).
3. Confirm that the configuration is effective.

## Common Issues

- Plugin cannot load: Check Java version, server version, plugin compatibility.
- Configuration file error: Check JSON format, syntax errors.
- Chat platform connection failed: Check if the Token is valid, platform restrictions.

## Support and Feedback

- Official Documentation: [NeoBot Official Documentation](https://github.com/NeoVoxelDev/NeoBot-Docs)
- GitHub Repository: [NeoVoxelDev/NeoBot](https://github.com/NeoVoxelDev/NeoBot)
- Community Support: [NeoBot Community](https://github.com/NeoVoxelDev/NeoBot-Docs/discussions)