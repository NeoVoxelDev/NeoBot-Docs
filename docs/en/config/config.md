# Configuring the NeoBot Plugin

To make NeoBot run properly, you need to configure the corresponding platform connection information here. Please follow these steps to configure:

1. Open the configuration file in the plugin directory, usually `plugins/NeoBot/config.json`.
2. Fill in the platform connection information as needed (this is an example snippet, please modify according to actual configuration items):
  ```json
  // filepath: plugins/NeoBot/config.json
  {
    // Configuration version, do not modify
    "version": 1,
    // Storage configuration
    "storage": {
      // Database type, optional values: h2, mysql, sqlite
      "type": "h2",
      // Database configuration
      "host": "127.0.0.1",
      // Database port
      "port": 3306,
      // Database username
      "username": "root",
      // Database password
      "password": "passw0rd",
      // Database name
      "database": "neobot",
      // Additional options
      "options": [
        // Use Unicode encoding
        "useUnicode=true",
        // Use UTF-8 character set
        "characterEncoding=utf-8"
      ],
      // Connection pool settings
      "pool-settings": {
        // Maximum number of connections in the connection pool
        "maximum-pool-size": 50,
        // Minimum number of idle connections
        "minimum-idle": 10,
        // Maximum connection lifetime (milliseconds)
        "maximum-lifetime": 1800000,
        // Connection idle timeout (milliseconds)
        "keepalive-time": 0,
        // Connection timeout (milliseconds)
        "connection-timeout": 5000
      }
    },
    // Bot platform configuration
    "bot": {
      // Bot type, optional values: onebot11-ws, onebot11-ws-reverse
      "type": [
        "onebot11-ws"
      ],
      // Forward Websocket configuration
      "onebot11-ws": {
        // Server address
        "url": "ws://127.0.0.1:3001",
        // Access token
        "access-token": ""
      },
      // Reverse Websocket configuration
      "onebot11-ws-reverse": {
        // Listening address
        "address": "127.0.0.1",
        // Listening port
        "port": "8080",
        // Access token
        "access-token": ""
      },
      // Bot options
      "options": {
        // Status check interval (seconds)
        "check-interval": 30,
        // Enabled group chat list
        "enable-groups": [
          // Add group numbers here
          114514,
          1919810
        ]
      }
    }
  }

  ```
3. Save and close the configuration file.