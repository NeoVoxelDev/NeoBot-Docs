# 配置 NeoBot 插件
要使 NeoBot 正常运行，您需要在这里配置相应的平台对接信息。请按照以下步骤进行配置：

1. 打开插件目录下的配置文件，通常为 `plugins/NeoBot/config.json`。
2. 按需填写平台对接信息（这是示例片段，请根据实际配置项修改）：
  ```json
  // filepath: plugins/NeoBot/config.json
  {
    // 配置版本，不要修改
    "version": 1,
    // 存储配置
    "storage": {
      // 数据库类型，可选值：h2、mysql、sqlite
      "type": "h2",
      // 数据库配置
      "host": "127.0.0.1",
      // 数据库端口
      "port": 3306,
      // 数据库用户名
      "username": "root",
      // 数据库密码
      "password": "passw0rd",
      // 数据库名称
      "database": "neobot",
      // 额外选项
      "options": [
        // 使用 Unicode 编码
        "useUnicode=true",
        // 使用 UTF-8 字符集
        "characterEncoding=utf-8"
      ],
      // 连接池设置
      "pool-settings": {
        // 连接池最大连接数
        "maximum-pool-size": 50,
        // 最小空闲连接数
        "minimum-idle": 10,
        // 连接最大存活时间（毫秒）
        "maximum-lifetime": 1800000,
        // 连接空闲超时时间（毫秒）
        "keepalive-time": 0,
        // 连接超时时间（毫秒）
        "connection-timeout": 5000
      }
    },
    // 机器人平台配置
    "bot": {
      // 机器人类型，可选值：onebot11-ws、onebot11-ws-reverse
      "type": [
        "onebot11-ws"
      ],
      //正向Websocket配置
      "onebot11-ws": {
        // 服务器地址
        "url": "ws://127.0.0.1:3001",
        // 访问令牌
        "access-token": ""
      },
      // 反向Websocket配置
      "onebot11-ws-reverse": {
        // 监听地址
        "address": "127.0.0.1",
        // 监听端口
        "port": "8080",
        // 访问令牌
        "access-token": ""
      },
      // 机器人选项
      "options": {
        // 状态检查间隔（秒）
        "check-interval": 30,
        // 启用的群聊列表
        "enable-groups": [
          // 在此处添加群号
          114514,
          1919810
        ]
      }
    }
  }

  ```
3. 保存并关闭配置文件。