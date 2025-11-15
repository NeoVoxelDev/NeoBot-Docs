# 配置 NeoBot 语言文件
要使 NeoBot 正确显示消息内容，您需要在这里配置相应的语言文件。请按照以下步骤进行配置：

1. 打开插件目录下的配置文件，通常为 `plugins/NeoBot/messages.json`。
2. 按需填写自己想要的信息（这是示例片段，请根据实际配置项修改）：
  ```json
  // filepath: plugins/NeoBot/messages.json
  {
    // 消息前缀
    "prefix": "&6[NeoBot] ",
    // 内置消息
    "internal": {
      // 帮助消息
      "help": [
        "&6NeoBot 帮助信息",
        "&a/neobot help   &b- 查看此帮助信息",
        "&a/neobot reload   &b- 重载插件"
      ],
      // 重载消息
      "reload": {
        "reloading": "&a正在重载插件...",
        "reloaded": "&a插件重载完成!"
      },
      // 无权限消息
      "no-permission": "&c您没有执行此操作的权限！"
    }
  }
  ```
3. 保存并关闭语言配置文件。