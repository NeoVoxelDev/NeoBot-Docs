# 插件安装指南

本文档说明 NeoBot 插件在常见 Minecraft 服务端上的安装与基础配置步骤，适用于 Paper / Purpur / Leaf 等基于 Bukkit 的服务端。

## 一、前提条件
- Java 运行环境：推荐 Java 17 或更高（与服务端版本一致）。
- 已准备可运行的 Minecraft 服务端（Paper、Purpur 等）。
- 拥有服务端文件夹的读写权限和重启/启动服务端的能力。
- 若需对接聊天平台（QQ/Discord/Telegram/Kook），需提前在对应平台申请机器人 Token / API Key 并记录。

## 二、下载插件
1. 在官方仓库或 Releases 页面下载最新版本的 NeoBot 插件 JAR（例如：NeoBot-V3.jar）。
2. 确认所下载版本与当前服务端兼容（Minecraft 与服务端 API 版本）。
::: tip 温馨提示
你可以在下面下载最新版本的 NeoBot 插件：
<DownloadCN />
:::

## 三、安装步骤
1. 将插件 JAR 复制到服务端根目录下的 `plugins` 文件夹：
   - Windows 示例（在服务端根目录）：将 `NeoBot-版本号.jar` 拷贝到 `plugins\`。
2. 启动或重启服务端：
   - 通过启动脚本（Windows: `start.bat` / Linux: `start.sh`），或在命令行运行：
     ```bash
     java -Xms1G -Xmx2G -jar [替换成你的服务端核心].jar nogui
     ```
3. 启动后，插件会在 `plugins/NeoBot/`（或插件名对应目录）下生成默认配置文件和初始数据。

## 四、基础配置（示例）
1. 打开插件目录下的配置文件，通常为 `plugins/NeoBot/config.yml` 或 `config.yml`。
2. 按需填写平台对接信息（这是示例片段，请根据实际配置项修改）：
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
3. 保存并关闭配置文件。

## 五、测试与验证
1. 启动服务端后，检查插件是否正常加载（控制台输出）。
2. 测试基础功能（如发送消息、获取玩家信息等）。
3. 确认配置是否生效。

## 六、常见问题
- 插件无法加载：检查 Java 版本、服务端版本、插件兼容性。
- 配置文件错误：检查 YAML 格式、语法错误。
- 聊天平台对接失败：检查 Token 是否有效、平台限制。

## 七、支持与反馈
- 官方文档：[NeoBot 官方文档](https://github.com/NeoBot-Team/NeoBot)
- GitHub 仓库：[NeoBot-Team/NeoBot](https://github.com/NeoBot-Team/NeoBot)
- 社区支持：[NeoBot 社区](https://github.com/NeoBot-Team/NeoBot/discussions)

---