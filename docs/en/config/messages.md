# Configuring NeoBot Language Files

To make NeoBot display message content correctly, you need to configure the corresponding language files here. Please follow these steps to configure:

1. Open the configuration file in the plugin directory, usually `plugins/NeoBot/messages.json`.
2. Fill in the information you want as needed (this is an example snippet, please modify according to actual configuration items):
  ```json
  // filepath: plugins/NeoBot/messages.json
  {
    // Message prefix
    "prefix": "&6[NeoBot] ",
    // Built-in messages
    "internal": {
      // Help messages
      "help": [
        "&6NeoBot Help Information",
        "&a/neobot help   &b- View this help information",
        "&a/neobot reload   &b- Reload plugin"
      ],
      // Reload messages
      "reload": {
        "reloading": "&aReloading plugin...",
        "reloaded": "&aPlugin reloaded successfully!"
      },
      // No permission message
      "no-permission": "&cYou do not have permission to perform this operation!"
    }
  }
  ```
3. Save and close the language configuration file.