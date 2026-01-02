# 接口文件

::: warning 注意
本章节内容为 NeoBot 脚本开发的接口文件说明，适用于有一定编程基础的用户。如您是初次使用 NeoBot，建议先阅读[快速开始](../../quick-started)。
:::

::: tip 提示
已注释大部分接口和方法的功能说明，方便开发者理解和使用。如有任何疑问或建议，欢迎加入[官方交流群](https://qm.qq.com/q/hRC6znrdPq)进行交流。
:::


## QQ 事件接口

<ApiInterfaceCN 
  interface-name="QQEvent" 
  interface-type="interface" 
  description="基础 QQ 事件接口，定义了所有 QQ 事件的通用属性和方法"
  :parameters="[
    { name: 'getSelfId', type: '() => number', required: true, description: '获取机器人自身 ID' },
    { name: 'getTime', type: '() => number', required: true, description: '获取事件发生时间戳' }
  ]"
  example="declare interface QQEvent {\n  getSelfId(): number;\n  getTime(): number;\n}"
  example-description="定义了 QQ 事件的基础接口，包含获取机器人 ID 和事件时间戳的方法"
/>



<ApiInterfaceCN 
  interface-name="GroupMessageEvent" 
  interface-type="interface" 
  description="群消息事件接口，继承自 QQEvent，用于处理群聊消息"
  :parameters="[
    { name: 'getGroupId', type: '() => number', required: true, description: '获取群组 ID' },
    { name: 'getMessageId', type: '() => number', required: true, description: '获取消息 ID' },
    { name: 'getSenderId', type: '() => number', required: true, description: '获取发送者 ID' },
    { name: 'getRawMessage', type: '() => string', required: true, description: '获取原始消息内容' },
    { name: 'getJsonMessage', type: '() => string', required: true, description: '获取 JSON 格式消息内容' }
  ]"
  example="qq.register(&quot;GroupMessageEvent&quot;, (event) => {\n  const jsonMessage = event.getJsonMessage()\n  const newMessage = scriptManager.callJsMethod(&quot;util.parseTextJsonMessage&quot;, jsonMessage)\n  console.log(&quot;群 &quot; + event.getGroupId() + &quot; 收到消息: &quot; + newMessage)\n})"
  example-description="注册群消息事件监听器，解析消息内容并输出群号和消息"
/>



<ApiInterfaceCN 
  interface-name="FriendAddEvent" 
  interface-type="interface" 
  description="好友添加事件接口，用于处理好友添加请求"
  :parameters="[
    { name: 'getUserId', type: '() => number', required: true, description: '获取用户 ID' }
  ]"
  example="qq.register(&quot;FriendAddEvent&quot;, (event) => {\n  console.log(&quot;收到好友添加请求: &quot; + event.getUserId())\n})"
  example-description="监听好友添加事件，输出添加好友的用户 ID"
/>



<ApiInterfaceCN 
  interface-name="GroupDecreaseEvent" 
  interface-type="interface" 
  description="群成员减少事件接口，用于处理成员退群或被踢"
  :parameters="[
    { name: 'getUserId', type: '() => number', required: true, description: '获取用户 ID' },
    { name: 'getOperatorId', type: '() => number', required: true, description: '获取操作者 ID' },
    { name: 'getGroupId', type: '() => number', required: true, description: '获取群组 ID' }
  ]"
  example="qq.register(&quot;GroupDecreaseEvent&quot;, (event) => {\n  console.log(&quot;用户 &quot; + event.getUserId() + &quot; 离开群 &quot; + event.getGroupId())\n})"
  example-description="监听群成员减少事件，输出离开群的用户 ID 和群号"
/>



<ApiInterfaceCN 
  interface-name="GroupIncreaseEvent" 
  interface-type="interface" 
  description="群成员增加事件接口，用于处理成员加群"
  :parameters="[
    { name: 'getUserId', type: '() => number', required: true, description: '获取用户 ID' },
    { name: 'getOperatorId', type: '() => number', required: true, description: '获取操作者 ID' },
    { name: 'getGroupId', type: '() => number', required: true, description: '获取群组 ID' }
  ]"
  example="qq.register(&quot;GroupIncreaseEvent&quot;, (event) => {\n  console.log(&quot;用户 &quot; + event.getUserId() + &quot; 加入群 &quot; + event.getGroupId())\n})"
  example-description="监听群成员增加事件，输出加入群的用户 ID 和群号"
/>



<ApiInterfaceCN 
  interface-name="PokeEvent" 
  interface-type="interface" 
  description="戳一戳事件接口，用于处理群内戳一戳互动"
  :parameters="[
    { name: 'getUserId', type: '() => number', required: true, description: '获取发起戳一戳的用户 ID' },
    { name: 'getGroupId', type: '() => number', required: true, description: '获取群组 ID' },
    { name: 'getTargetId', type: '() => number', required: true, description: '获取被戳的用户 ID' }
  ]"
  example="qq.register(&quot;PokeEvent&quot;, (event) => {\n  console.log(&quot;用户 &quot; + event.getUserId() + &quot; 戳了用户 &quot; + event.getTargetId())\n})"
  example-description="监听戳一戳事件，输出发起者和被戳者的用户 ID"
/>



<ApiInterfaceCN 
  interface-name="FriendRequestEvent" 
  interface-type="interface" 
  description="好友请求事件接口，用于处理好友添加请求"
  :parameters="[
    { name: 'getUserId', type: '() => number', required: true, description: '获取请求添加好友的用户 ID' },
    { name: 'getComment', type: '() => string', required: true, description: '获取验证消息' },
    { name: 'getFlag', type: '() => string', required: true, description: '获取请求标识，用于处理请求' }
  ]"
  example="qq.register(&quot;FriendRequestEvent&quot;, (event) => {\n  console.log(&quot;收到好友请求: &quot; + event.getUserId() + &quot;, 验证消息: &quot; + event.getComment())\n})"
  example-description="监听好友请求事件，输出请求者 ID 和验证消息"
/>



<ApiInterfaceCN 
  interface-name="GroupRequestEvent" 
  interface-type="interface" 
  description="群请求事件接口，用于处理加群请求"
  :parameters="[
    { name: 'getUserId', type: '() => number', required: true, description: '获取请求加群的用户 ID' },
    { name: 'getGroupId', type: '() => number', required: true, description: '获取群组 ID' },
    { name: 'getComment', type: '() => string', required: true, description: '获取验证消息' },
    { name: 'getFlag', type: '() => string', required: true, description: '获取请求标识，用于处理请求' }
  ]"
  example="qq.register(&quot;GroupRequestEvent&quot;, (event) => {\n  console.log(&quot;收到加群请求: &quot; + event.getUserId() + &quot;, 群: &quot; + event.getGroupId() + &quot;, 验证消息: &quot; + event.getComment())\n})"
  example-description="监听加群请求事件，输出请求者 ID、群号和验证消息"
/>

## 用户信息接口

<ApiInterfaceCN 
  interface-name="BasicInfo" 
  interface-type="interface" 
  description="基础信息接口，定义用户的基本信息"
  :parameters="[
    { name: 'getUserId', type: '() => number', required: true, description: '获取用户 ID' },
    { name: 'getNickname', type: '() => string', required: true, description: '获取用户昵称' }
  ]"
  example="const userInfo: BasicInfo = {\n  getUserId: () => 123456789,\n  getNickname: () => &quot;测试用户&quot;\n}\nconsole.log(&quot;用户ID: &quot; + userInfo.getUserId() + &quot;, 昵称: &quot; + userInfo.getNickname())"
  example-description="创建基础信息对象，获取用户 ID 和昵称"
/>



<ApiInterfaceCN 
  interface-name="FriendInfo" 
  interface-type="interface" 
  description="好友信息接口，继承自 BasicInfo，扩展好友特有信息"
  :parameters="[
    { name: 'getUserId', type: '() => number', required: true, description: '获取用户 ID' },
    { name: 'getNickname', type: '() => string', required: true, description: '获取用户昵称' },
    { name: 'getRemark', type: '() => string', required: true, description: '获取好友备注' }
  ]"
  example="const friendInfo: FriendInfo = {\n  getUserId: () => 123456789,\n  getNickname: () => &quot;好友昵称&quot;,\n  getRemark: () => &quot;好友备注&quot;\n}\nconsole.log(&quot;好友备注: &quot; + friendInfo.getRemark())"
  example-description="创建好友信息对象，获取好友备注信息"
/>



<ApiInterfaceCN 
  interface-name="GroupInfo" 
  interface-type="interface" 
  description="群组信息接口，提供群组相关信息"
  tip="GroupInfo 接口的 getGroupMemberCount() 方法不存在\n- GroupInfo 接口实际上不包含 getGroupMemberCount() 方法\n- 调用 getGroupMemberCount() 会抛出 &quot;Unknown identifier: getGroupMemberCount&quot; 异常\n- d.ts 类型定义中的 getGroupMemberCount() 是不准确的\n\n注意: 无法通过 GroupInfo 获取群成员数量"
  :parameters="[
    { name: 'getGroupId', type: '() => number', required: true, description: '获取群组 ID' },
    { name: 'getGroupName', type: '() => string', required: true, description: '获取群组名称' },
    { name: 'getGroupMemberCount', type: '() => number', required: true, description: '获取群成员数量' },
    { name: 'getGroupMaxMemberCount', type: '() => number', required: true, description: '获取群最大成员数量' }
  ]"
  example="qq.getGroupList((groups: GroupInfo[]) => {\n  for (const group of groups) {\n    console.log(&quot;群名: &quot; + group.getGroupName() + &quot;, 成员数: &quot; + group.getGroupMemberCount() + &quot;/&quot; + group.getGroupMaxMemberCount())\n  }\n})"
  example-description="获取所有群组列表，并输出群名和成员数量"
/>



<ApiInterfaceCN 
  interface-name="GroupMemberInfo" 
  interface-type="interface" 
  description="群成员信息接口，提供群成员详细信息"
  tip="GroupMemberInfo 接口的 getCardChangeable() 方法不存在\n- GroupMemberInfo 接口实际上不包含 getCardChangeable() 方法\n- 调用 getCardChangeable() 会抛出 &quot;Unknown identifier: getCardChangeable&quot; 异常\n- d.ts 类型定义中的 getCardChangeable() 是不准确的\n\n注意: 无法通过 GroupMemberInfo 获取群名片是否可修改"
  :parameters="[
    { name: 'getGroupId', type: '() => number', required: true, description: '获取群组 ID' },
    { name: 'getUserId', type: '() => number', required: true, description: '获取用户 ID' },
    { name: 'getNickname', type: '() => string', required: true, description: '获取用户昵称' },
    { name: 'getCard', type: '() => string', required: true, description: '获取群名片' },
    { name: 'getAge', type: '() => number', required: true, description: '获取群龄（天数）' },
    { name: 'getArea', type: '() => string', required: true, description: '获取地区' },
    { name: 'getJoinTime', type: '() => number', required: true, description: '获取加群时间戳' },
    { name: 'getLastSentTime', type: '() => number', required: true, description: '获取最后发言时间戳' },
    { name: 'getLevel', type: '() => string', required: true, description: '获取等级' },
    { name: 'getTitle', type: '() => string', required: true, description: '获取头衔' },
    { name: 'getTitleExpireTime', type: '() => number', required: true, description: '获取头衔过期时间' },
    { name: 'getCardChangeable', type: '() => boolean', required: true, description: '获取是否可修改群名片' },
    { name: 'getRole', type: '() => Enum', required: true, description: '获取群角色' },
    { name: 'getSex', type: '() => Enum', required: true, description: '获取性别' }
  ]"
  example="qq.getGroupMemberInfo(groupId, userId, (memberInfo: GroupMemberInfo) => {\n  const name = memberInfo.getCard() || memberInfo.getNickname()\n  const role = memberInfo.getRole().toString()\n  console.log(&quot;成员: &quot; + name + &quot;, 角色: &quot; + role)\n})"
  example-description="获取群成员信息，优先使用群名片，否则使用昵称，并输出角色信息"
/>

## 游戏事件接口

<ApiInterfaceCN 
  interface-name="LoginEvent" 
  interface-type="interface" 
  description="登录事件接口，用于处理玩家登录事件"
  :parameters="[
    { name: 'getName', type: '() => string', required: true, description: '获取玩家名称' },
    { name: 'disallow', type: '(reason: string): void', required: true, description: '拒绝玩家登录并显示原因' }
  ]"
  example="gameEvent.register(&quot;LoginEvent&quot;, (event: LoginEvent) => {\n  if (!isWhitelisted(event.getName())) {\n    event.disallow(&quot;您不在白名单中!&quot;)\n  }\n})"
  example-description="监听玩家登录事件，检查白名单并拒绝非白名单玩家登录"
/>



<ApiInterfaceCN 
  interface-name="JoinEvent" 
  interface-type="interface" 
  description="玩家加入事件接口，用于处理玩家加入游戏事件"
  :parameters="[
    { name: 'getName', type: '() => string', required: true, description: '获取玩家名称' }
  ]"
  example="gameEvent.register(&quot;JoinEvent&quot;, (event: JoinEvent) => {\n  const message = messageConfig.getString(&quot;game-notice.on-join&quot;)\n    .replaceAll(&quot;${playerName}&quot;, event.getName())\n  for (const groupId of generalConfig.getNumberArray(&quot;bot.options.enable-groups&quot;)) {\n    scriptManager.callJsMethod(&quot;util.sendGroupTextMessage&quot;, groupId, message)\n  }\n})"
  example-description="监听玩家加入事件，向配置的群发送加入通知"
/>



<ApiInterfaceCN 
  interface-name="QuitEvent" 
  interface-type="interface" 
  description="玩家退出事件接口，用于处理玩家退出游戏事件"
  :parameters="[
    { name: 'getName', type: '() => string', required: true, description: '获取玩家名称' }
  ]"
  example="gameEvent.register(&quot;QuitEvent&quot;, (event: QuitEvent) => {\n  const message = messageConfig.getString(&quot;game-notice.on-quit&quot;)\n    .replaceAll(&quot;${playerName}&quot;, event.getName())\n  for (const groupId of generalConfig.getNumberArray(&quot;bot.options.enable-groups&quot;)) {\n    scriptManager.callJsMethod(&quot;util.sendGroupTextMessage&quot;, groupId, message)\n  }\n})"
  example-description="监听玩家退出事件，向配置的群发送退出通知"
/>



<ApiInterfaceCN 
  interface-name="ChatEvent" 
  interface-type="interface" 
  description="聊天事件接口，用于处理游戏内聊天消息"
  :parameters="[
    { name: 'getPlayer', type: '() => Player', required: true, description: '获取发送消息的玩家对象' },
    { name: 'getMessage', type: '() => string', required: true, description: '获取消息内容' },
    { name: 'disallow', type: '(): void', required: true, description: '阻止消息发送' }
  ]"
  example="gameEvent.register(&quot;ChatEvent&quot;, (event: ChatEvent) => {\n  const name = event.getPlayer().getName()\n  let message = event.getMessage()\n  if (generalConfig.getBoolean(&quot;chat-forward.to-qq.format&quot;)) {\n    message = scriptManager.callJsMethod(&quot;util.gameToQQ&quot;, message)\n  }\n  const format = messageConfig.getString(&quot;chat-forward.to-qq&quot;)\n    .replaceAll(&quot;${playerName}&quot;, name)\n    .replaceAll(&quot;${message}&quot;, message)\n  for (const groupId of generalConfig.getNumberArray(&quot;bot.options.enable-groups&quot;)) {\n    scriptManager.callJsMethod(&quot;util.sendGroupTextMessage&quot;, groupId, format)\n  }\n})"
  example-description="监听游戏聊天事件，将游戏内消息转发到 QQ 群"
/>

## 游戏对象接口

<ApiInterfaceCN 
  interface-name="Player" 
  interface-type="interface" 
  description="玩家接口，提供玩家相关操作方法"
  :parameters="[
    { name: 'getName', type: '() => string', required: true, description: '获取玩家名称' },
    { name: 'sendMessage', type: '(message: string): void', required: true, description: '向玩家发送消息' },
    { name: 'kick', type: '(message: string): void', required: true, description: '踢出玩家' },
    { name: 'hasPermission', type: '(permission: string): boolean', required: true, description: '检查玩家是否有权限' },
    { name: 'isOnline', type: '() => boolean', required: true, description: '检查玩家是否在线' }
  ]"
  example="const player = plugin.getOnlinePlayer(&quot;Steve&quot;)\nif (player) {\n  player.sendMessage(&quot;欢迎来到服务器!&quot;)\n  if (player.hasPermission(&quot;admin.kick&quot;)) {\n    console.log(&quot;玩家有踢人权限&quot;)\n  }\n}"
  example-description="获取在线玩家对象，发送消息并检查权限"
/>



<ApiInterfaceCN 
  interface-name="OfflinePlayer" 
  interface-type="interface" 
  description="离线玩家接口，提供离线玩家的基本信息"
  :parameters="[
    { name: 'getName', type: '() => string', required: true, description: '获取玩家名称' },
    { name: 'isOnline', type: '() => boolean', required: true, description: '检查玩家是否在线' }
  ]"
  example="const offlinePlayer = plugin.getOfflinePlayer(&quot;Steve&quot;)\nconsole.log(&quot;玩家名称: &quot; + offlinePlayer.getName())\nconsole.log(&quot;是否在线: &quot; + offlinePlayer.isOnline())"
  example-description="获取离线玩家对象并检查其名称和在线状态"
/>



<ApiInterfaceCN 
  interface-name="CommandSender" 
  interface-type="interface" 
  description="命令发送者接口，用于处理命令执行者"
  :parameters="[
    { name: 'getName', type: '() => string', required: true, description: '获取发送者名称' },
    { name: 'sendMessage', type: '(message: string): void', required: true, description: '向发送者发送消息' },
    { name: 'hasPermission', type: '(permission: string): boolean', required: true, description: '检查发送者是否有权限' }
  ]"
  example="gameCommand.onCommand((sender: CommandSender, args: string[]) => {\n  if (!sender.hasPermission(&quot;neobot.admin&quot;)) {\n    sender.sendMessage(&quot;您没有权限执行此命令!&quot;)\n    return\n  }\n  sender.sendMessage(&quot;命令执行成功!&quot;)\n})"
  example-description="注册命令处理器，检查权限并发送消息"
/>



<ApiInterfaceCN 
  interface-name="Game" 
  interface-type="interface" 
  description="游戏事件接口，用于注册游戏事件监听器"
  :parameters="[
    { name: 'register', type: '(eventName: string, callback: (arg: any[]) => void): void', required: true, description: '注册游戏事件监听器' }
  ]"
  example="gameEvent.register(&quot;JoinEvent&quot;, (event: JoinEvent) => {\n  console.log(&quot;玩家 &quot; + event.getName() + &quot; 加入了游戏&quot;)\n})"
  example-description="注册游戏事件监听器，处理玩家加入事件"
/>



<ApiInterfaceCN 
  interface-name="GameCommand" 
  interface-type="interface" 
  description="游戏命令接口，用于注册游戏命令处理器"
  :parameters="[
    { name: 'onCommand', type: '(callback: (sender: CommandSender, args: string[]) => void): void', required: true, description: '注册命令处理器' }
  ]"
  example="gameCommand.onCommand((sender: CommandSender, args: string[]) => {\n  sender.sendMessage(&quot;执行命令，参数: &quot; + args.join(&quot;, &quot;))\n})"
  example-description="注册游戏命令处理器，处理命令执行"
/>

## 网络通信接口

<ApiInterfaceCN 
  interface-name="HttpResult" 
  interface-type="interface" 
  description="HTTP 请求结果接口，用于处理 HTTP 响应"
  :parameters="[
    { name: 'getStatusCode', type: '(): number', required: true, description: '获取 HTTP 状态码' },
    { name: 'getResponseContent', type: '(): string', required: true, description: '获取响应内容' }
  ]"
  example="const request = http.builder(&quot;https://api.example.com/data&quot;).get()\nconst result = request.connect()\n\nif (result.getStatusCode() === 200) {\n  console.log(&quot;请求成功:&quot;, result.getResponseContent())\n} else {\n  console.log(&quot;请求失败，状态码:&quot;, result.getStatusCode())\n}"
  example-description="发送 HTTP 请求并处理响应结果"
/>



<ApiInterfaceCN 
  interface-name="HttpRequest" 
  interface-type="interface" 
  description="HTTP 请求接口，用于配置和发送 HTTP 请求"
  :parameters="[
    { name: 'timeout', type: '(timeout: number): HttpRequest', required: true, description: '设置超时时间（毫秒）' },
    { name: 'connectTimeout', type: '(timeout: number): HttpRequest', required: true, description: '设置连接超时时间（毫秒）' },
    { name: 'readTimeout', type: '(timeout: number): HttpRequest', required: true, description: '设置读取超时时间（毫秒）' },
    { name: 'header', type: '(name: string, value: string): HttpRequest', required: true, description: '添加请求头' },
    { name: 'connect', type: '(): HttpResult', required: true, description: '发送请求并获取结果' }
  ]"
  example="const request = http.builder(&quot;https://api.example.com/data&quot;)\n  .get()\n  .timeout(5000)\n  .header(&quot;Content-Type&quot;, &quot;application/json&quot;)\n  .header(&quot;Authorization&quot;, &quot;Bearer token123&quot;)\n  \nconst result = request.connect()"
  example-description="配置 HTTP 请求参数并发送请求"
/>



<ApiInterfaceCN 
  interface-name="HttpBuilder" 
  interface-type="interface" 
  description="HTTP 构建器接口，用于创建 HTTP 请求"
  :parameters="[
    { name: 'get', type: '(): HttpRequest', required: true, description: '创建 GET 请求' },
    { name: 'post', type: '(): HttpRequest', required: true, description: '创建 POST 请求' },
    { name: 'put', type: '(): HttpRequest', required: true, description: '创建 PUT 请求' },
    { name: 'delete', type: '(): HttpRequest', required: true, description: '创建 DELETE 请求' }
  ]"
  example="// GET 请求\nconst getRequest = http.builder(&quot;https://api.example.com/data&quot;).get()\n\n// POST 请求\nconst postRequest = http.builder(&quot;https://api.example.com/data&quot;).post()\n\n// PUT 请求\nconst putRequest = http.builder(&quot;https://api.example.com/data/1&quot;).put()\n\n// DELETE 请求\nconst deleteRequest = http.builder(&quot;https://api.example.com/data/1&quot;).delete()"
  example-description="创建不同类型的 HTTP 请求"
/>



<ApiInterfaceCN 
  interface-name="Http" 
  interface-type="interface" 
  description="HTTP 接口，用于创建 HTTP 请求构建器"
  tip="HTTP 接口的 URL 格式要求\n- http.builder() 的 URL 参数必须包含协议（http:// 或 https://）\n- 缺少协议时会抛出 &quot;no protocol: &lt;url&gt;&quot; 异常\n- 错误示例: http.builder(&quot;example.com&quot;) 会抛出 &quot;no protocol: example.com&quot;\n- 正确示例: http.builder(&quot;https://example.com&quot;)\n- 正确示例: http.builder(&quot;http://localhost:8080&quot;)\n\n注意: URL 必须是完整的绝对路径，包含协议、域名和可选的端口\n\nHTTP 接口的超时处理机制\n- 当请求超时时会抛出 &quot;Read timed out&quot; 异常\n- 需要使用 try-catch 来捕获和处理超时异常\n- 三种超时设置方法:\n  - timeout(): 设置总体超时时间（毫秒）\n  - connectTimeout(): 设置连接超时时间（毫秒）\n  - readTimeout(): 设置读取超时时间（毫秒）\n\nHTTP 接口的状态码处理\n- HttpResult.getStatusCode() 返回 HTTP 状态码\n- 即使返回 404、500 等错误状态码，connect() 也不会抛出异常\n- 需要手动检查状态码来判断请求是否成功\n\n注意: 不要假设状态码为 200 就是成功，应该根据业务需求判断\n\nHTTP 接口的链式调用\n- HttpRequest 支持链式调用，可以连续设置多个参数\n- 可以同时设置多个超时参数和请求头\n\n注意: 链式调用的顺序不影响最终效果"
  :parameters="[
    { name: 'builder', type: '(url: string): HttpBuilder', required: true, description: '创建指定 URL 的 HTTP 请求构建器' }
  ]"
  example="const request = http.builder(&quot;https://api.example.com/data&quot;)\nconst getRequest = request.get()\nconst result = getRequest.connect()"
  example-description="创建 HTTP 请求构建器并发送请求"
/>

## 数据存储接口

<ApiInterfaceCN 
  interface-name="DatabaseCreator" 
  interface-type="interface" 
  description="数据库创建接口，用于创建数据库表"
  :parameters="[
    { name: 'column', type: '(name: string, type: string, extraOptions: string): DatabaseCreator', required: true, description: '添加列定义' },
    { name: 'execute', type: '(): void', required: true, description: '执行表创建操作' }
  ]"
  example="const table = plugin.getStorageProvider().getStorage().table(&quot;neobot_whitelist&quot;)\ntable.create()\n  .column(&quot;qq&quot;, &quot;BIGINT&quot;, &quot;PRIMARY KEY&quot;)\n  .column(&quot;players&quot;, &quot;TEXT&quot;, &quot;NOT NULL&quot;)\n  .execute()"
  example-description="创建数据库表，定义列结构并执行创建"
/>



<ApiInterfaceCN 
  interface-name="Row" 
  interface-type="interface" 
  description="数据库行接口，用于访问查询结果中的单行数据"
  :parameters="[
    { name: 'getString', type: '(column: string): string', required: true, description: '获取字符串类型列值' },
    { name: 'getInt', type: '(column: string): number', required: true, description: '获取整数类型列值' },
    { name: 'getLong', type: '(column: string): number', required: true, description: '获取长整数类型列值' },
    { name: 'getFloat', type: '(column: string): number', required: true, description: '获取浮点数类型列值' },
    { name: 'getDouble', type: '(column: string): number', required: true, description: '获取双精度浮点数类型列值' },
    { name: 'getBoolean', type: '(column: string): boolean', required: true, description: '获取布尔类型列值' },
    { name: 'getObject', type: '(column: string): any', required: true, description: '获取对象类型列值' },
    { name: 'getObject', type: '(column: string, type: T): T', required: true, description: '获取指定类型的列值' }
  ]"
  example="const result = table.select([&quot;players&quot;, &quot;qq&quot;]).execute()\nfor (const row of result.map()) {\n  const qq = row.getLong(&quot;qq&quot;)\n  const players = JSON.parse(row.getString(&quot;players&quot;))\n  console.log(&quot;QQ: &quot; + qq + &quot;, 绑定玩家: &quot; + players.join(&quot;, &quot;))\n}"
  example-description="遍历查询结果，获取行数据并解析"
/>



<ApiInterfaceCN 
  interface-name="Result" 
  interface-type="interface" 
  description="数据库查询结果接口，用于处理查询结果"
  :parameters="[
    { name: 'map', type: '(): Row[]', required: true, description: '将结果转换为行数组' },
    { name: 'getFirst', type: '(): Row', required: true, description: '获取第一行数据' },
    { name: 'get', type: '(index: number): Row', required: true, description: '获取指定索引的行数据' }
  ]"
  example="const result = table.select([&quot;players&quot;]).where(&quot;qq&quot;, userId).execute()\nif (result.map().length > 0) {\n  const firstRow = result.getFirst()\n  const players = JSON.parse(firstRow.getString(&quot;players&quot;))\n  console.log(&quot;绑定的玩家: &quot; + players.join(&quot;, &quot;))\n}"
  example-description="执行查询并处理结果，获取第一行数据"
/>



<ApiInterfaceCN 
  interface-name="DatabaseSelector" 
  interface-type="interface" 
  description="数据库查询接口，用于构建和执行查询"
  :parameters="[
    { name: 'all', type: '(): DatabaseSelector', required: true, description: '查询所有列' },
    { name: 'column', type: '(column: string): DatabaseSelector', required: true, description: '指定查询列' },
    { name: 'column', type: '(column: string[]): DatabaseSelector', required: true, description: '指定多个查询列' },
    { name: 'where', type: '(column: string, value: any): DatabaseSelector', required: true, description: '添加等值条件' },
    { name: 'where', type: '(column: string, operator: string, value: any): DatabaseSelector', required: true, description: '添加条件' },
    { name: 'execute', type: '(): Result', required: true, description: '执行查询' }
  ]"
  example="const result = table.select([&quot;players&quot;, &quot;qq&quot;])\n  .where(&quot;qq&quot;, userId)\n  .execute()\n  \nconst rows = table.select()\n  .where(&quot;time&quot;, &quot;&gt;&quot;, Date.now() - 86400000)\n  .execute().map()"
  example-description="构建查询条件，执行查询并获取结果"
/>



<ApiInterfaceCN 
  interface-name="DatabaseUpdater" 
  interface-type="interface" 
  description="数据库更新接口，用于更新数据"
  :parameters="[
    { name: 'set', type: '(column: string, value: any): DatabaseUpdater', required: true, description: '设置更新列和值' },
    { name: 'where', type: '(column: string, value: any): DatabaseUpdater', required: true, description: '添加等值条件' },
    { name: 'where', type: '(column: string, operator: string, value: any): DatabaseUpdater', required: true, description: '添加条件' },
    { name: 'execute', type: '(): void', required: true, description: '执行更新' }
  ]"
  example="table.update()\n  .set(&quot;players&quot;, JSON.stringify(playerData))\n  .where(&quot;qq&quot;, userId)\n  .execute()\n  \ntable.update()\n  .set(&quot;time&quot;, Date.now())\n  .set(&quot;note&quot;, code)\n  .where(&quot;action&quot;, &quot;ACQUIRE_VERIFY&quot;)\n  .where(&quot;player&quot;, playerName)\n  .execute()"
  example-description="构建更新操作，设置更新值和条件，执行更新"
/>



<ApiInterfaceCN 
  interface-name="DatabaseInserter" 
  interface-type="interface" 
  description="数据库插入接口，用于插入数据"
  :parameters="[
    { name: 'column', type: '(column: string, value: any): DatabaseInserter', required: true, description: '添加列和值' },
    { name: 'execute', type: '(): void', required: true, description: '执行插入' }
  ]"
  example="table.insert()\n  .column(&quot;qq&quot;, qqId)\n  .column(&quot;players&quot;, JSON.stringify(playerData))\n  .execute()\n  \nlogTable.insert()\n  .column(&quot;time&quot;, Date.now())\n  .column(&quot;operator&quot;, qqId)\n  .column(&quot;target&quot;, qqId)\n  .column(&quot;player&quot;, playerName)\n  .column(&quot;action&quot;, &quot;BIND&quot;)\n  .column(&quot;note&quot;, &quot;NONE&quot;)\n  .execute()"
  example-description="构建插入操作，添加列和值，执行插入"
/>



<ApiInterfaceCN 
  interface-name="DatabaseModifier" 
  interface-type="interface" 
  description="数据库修改接口，用于修改表结构"
  :parameters="[
    { name: 'add', type: '(name: string, type: string): DatabaseModifier', required: true, description: '添加列' },
    { name: 'add', type: '(name: string, type: string, extraOptions: string): DatabaseModifier', required: true, description: '添加带选项的列' },
    { name: 'remove', type: '(name: string): DatabaseModifier', required: true, description: '删除列' },
    { name: 'execute', type: '(): void', required: true, description: '执行修改' }
  ]"
  example="table.alter()\n  .add(&quot;new_column&quot;, &quot;VARCHAR(255)&quot;)\n  .add(&quot;another_column&quot;, &quot;INT&quot;, &quot;NOT NULL DEFAULT 0&quot;)\n  .remove(&quot;old_column&quot;)\n  .execute()"
  example-description="修改表结构，添加和删除列"
/>



<ApiInterfaceCN 
  interface-name="DatabaseDeleter" 
  interface-type="interface" 
  description="数据库删除接口，用于删除数据"
  :parameters="[
    { name: 'where', type: '(column: string, value: any): DatabaseDeleter', required: true, description: '添加等值条件' },
    { name: 'where', type: '(column: string, operator: string, value: any): DatabaseDeleter', required: true, description: '添加条件' },
    { name: 'execute', type: '(): void', required: true, description: '执行删除' }
  ]"
  example="table.delete()\n  .where(&quot;qq&quot;, userId)\n  .execute()\n  \nlogTable.delete()\n  .where(&quot;time&quot;, &quot;&lt;&quot;, Date.now() - 604800000)\n  .execute()"
  example-description="构建删除操作，添加条件，执行删除"
/>



<ApiInterfaceCN 
  interface-name="DatabaseTable" 
  interface-type="interface" 
  description="数据库表接口，提供表操作方法"
  tip="Database 接口的 table.create() 列定义语法限制\n- H2 数据库不支持在 column() 的 extraOptions 参数中使用 &quot;PRIMARY KEY IDENTITY&quot; 组合\n- PRIMARY KEY 和 IDENTITY 必须分开定义或使用不同的语法\n- 错误语法会抛出 SQL 语法错误：&quot;expected &quot;HASH, CONSTRAINT, COMMENT, UNIQUE, NOT NULL, CHECK, REFERENCES, ,, )&quot;&quot;\n\n注意: extraOptions 参数应该只包含一个约束条件，多个约束需要多次调用 column()\n\nDatabase 接口的 insert/update/delete/alter 静默失败行为\n- insert()、update()、delete()、alter() 方法在 SQL 执行失败时不会抛出异常\n- 这些方法会捕获 SQL 异常并静默失败，返回 SUCCESS\n- 需要检查日志中的 SQL 错误来发现失败\n\n注意: 这些方法不会返回错误信息，只能通过日志来判断是否成功\n\nDatabase 接口的 select() 错误处理\n- select() 方法在 SQL 执行失败时返回 null，而不是抛出异常\n- 调用 null 的 map()、getFirst()、get() 方法会抛出异常\n- 需要先检查返回值是否为 null\n\n注意: select() 是唯一会返回 null 的方法，其他操作方法静默失败"
  :parameters="[
    { name: 'drop', type: '(): void', required: true, description: '删除表' },
    { name: 'delete', type: '(): DatabaseDeleter', required: true, description: '创建删除操作' },
    { name: 'select', type: '(columns: string[]): DatabaseSelector', required: true, description: '创建查询操作' },
    { name: 'create', type: '(): DatabaseCreator', required: true, description: '创建表操作' },
    { name: 'update', type: '(): DatabaseUpdater', required: true, description: '创建更新操作' },
    { name: 'insert', type: '(): DatabaseInserter', required: true, description: '创建插入操作' },
    { name: 'alter', type: '(): DatabaseModifier', required: true, description: '创建修改表结构操作' }
  ]"
  example="const table = storage.table(&quot;my_table&quot;)\n\n// 创建表\ntable.create()\n  .column(&quot;id&quot;, &quot;INT&quot;, &quot;PRIMARY KEY AUTO_INCREMENT&quot;)\n  .column(&quot;name&quot;, &quot;VARCHAR(255)&quot;, &quot;NOT NULL&quot;)\n  .execute()\n  \n// 插入数据\ntable.insert()\n  .column(&quot;name&quot;, &quot;测试&quot;)\n  .execute()\n  \n// 查询数据\nconst result = table.select([&quot;id&quot;, &quot;name&quot;])\n  .where(&quot;name&quot;, &quot;测试&quot;)\n  .execute()"
  example-description="获取表对象并执行各种表操作"
/>



<ApiInterfaceCN 
  interface-name="DatabaseStorage" 
  interface-type="interface" 
  description="数据库存储接口，用于获取表对象"
  tip="Database 接口的表名大小写敏感性\n- H2 数据库默认将表名转换为大写\n- 创建表时使用小写名称，查询时表名会被转换为大写\n- 错误信息中显示的表名是大写的（如 &quot;TEST_DB_TABLE&quot;）\n\n注意: 这可能导致混淆，特别是在错误信息中\n\nDatabase 接口的 SQL 错误分类\n- H2 数据库的 SQL 错误会以 WARN 级别记录到日志\n- 错误信息包含完整的 SQL 语句和错误位置\n- 常见错误代码:\n  - 42001: SQL 语法错误\n  - 42102: 表或视图不存在\n\n注意: 错误信息中的 [*] 标记了 SQL 语法错误的位置"
  :parameters="[
    { name: 'table', type: '(name: string): DatabaseTable', required: true, description: '获取指定名称的表对象' }
  ]"
  example="const storage = plugin.getStorageProvider().getStorage()\nconst table = storage.table(&quot;neobot_whitelist&quot;)\nconst logTable = storage.table(&quot;neobot_whitelist_logs&quot;)"
  example-description="获取数据库存储对象并访问表"
/>

## 系统工具接口

<ApiInterfaceCN 
  interface-name="QQ" 
  interface-type="interface" 
  description="QQ 接口，提供 QQ 机器人相关操作方法"
  tip="QQ.sendGroupMessage 和 QQ.sendPrivateMessage 的 message 参数必须是 JSON Array 格式的字符串\n错误用法: qq.sendGroupMessage(groupId, &quot;Hello World&quot;)\n错误用法: qq.sendGroupMessage(groupId, '{&quot;type&quot;:&quot;text&quot;,&quot;text&quot;:&quot;Hello&quot;}')\n\n正确用法: qq.sendGroupMessage(groupId, JSON.stringify([{&quot;type&quot;:&quot;text&quot;, &quot;data&quot;:{&quot;text&quot;:&quot;Hello&quot;}}]))\n正确用法: qq.sendPrivateMessage(userId, JSON.stringify([{&quot;type&quot;:&quot;text&quot;, &quot;data&quot;:{&quot;text&quot;:&quot;Hello&quot;}}]))\n\n消息格式说明:\n- message 参数必须是字符串类型，且必须是有效的 JSON Array 格式\n- JSON Array 必须以 '[' 开头，以 ']' 结尾\n- 每个 Array 元素是一个消息对象，包含 type 和 data 字段\n- 常见消息类型:\n  - text: {&quot;type&quot;:&quot;text&quot;, &quot;data&quot;:{&quot;text&quot;:&quot;消息内容&quot;}}\n  - image: {&quot;type&quot;:&quot;image&quot;, &quot;data&quot;:{&quot;url&quot;:&quot;图片URL&quot;}}\n  - at: {&quot;type&quot;:&quot;at&quot;, &quot;data&quot;:{&quot;qq&quot;:用户QQ号}}\n  - face: {&quot;type&quot;:&quot;face&quot;, &quot;data&quot;:{&quot;id&quot;:表情ID}}\n\n注意: d.ts 中的类型定义为 message: string 是不准确的，实际要求是 JSON Array 字符串"
  :parameters="[
    { name: 'register', type: '(eventName: string, callback: (arg: QQEvent) => void): void', required: true, description: '注册事件监听器' },
    { name: 'sendGroupMessage', type: '(groupId: number, message: string): void', required: true, description: '发送群消息' },
    { name: 'sendPrivateMessage', type: '(userId: number, message: string): void', required: true, description: '发送私聊消息' },
    { name: 'renameGroupMember', type: '(groupId: number, userId: number, newName: string): void', required: true, description: '修改群成员群名片' },
    { name: 'muteGroupMember', type: '(groupId: number, userId: number, duration: number): void', required: true, description: '禁言群成员' },
    { name: 'muteAllGroupMember', type: '(groupId: number): void', required: true, description: '开启全员禁言' },
    { name: 'unMuteAllGroupMember', type: '(groupId: number): void', required: true, description: '关闭全员禁言' },
    { name: 'kickGroupMember', type: '(groupId: number, userId: number): void', required: true, description: '踢出群成员' },
    { name: 'approveGroupRequest', type: '(flag: string, type: string): void', required: true, description: '同意群请求' },
    { name: 'rejectGroupRequest', type: '(flag: string, type: string): void', required: true, description: '拒绝群请求' },
    { name: 'rejectFriendRequest', type: '(flag: string): void', required: true, description: '拒绝好友请求' },
    { name: 'approveFriendRequest', type: '(flag: string): void', required: true, description: '同意好友请求' },
    { name: 'setGroupSpecialTitle', type: '(groupId: number, userId: number, title: string, duration: number): void', required: true, description: '设置群成员专属头衔' },
    { name: 'setGroupWholeBan', type: '(groupId: number, enable: boolean): void', required: true, description: '设置全员禁言状态' },
    { name: 'recallMessage', type: '(messageId: number): void', required: true, description: '撤回消息' },
    { name: 'getGroupMemberList', type: '(groupId: number, callback: (arg: BasicInfo[]) => void): void', required: true, description: '获取群成员列表' },
    { name: 'getGroupMemberInfo', type: '(groupId: number, userId: number, callback: (arg: GroupMemberInfo) => void): void', required: true, description: '获取群成员信息' },
    { name: 'getGroupList', type: '(callback: (arg: GroupInfo[]) => void): void', required: true, description: '获取群列表' },
    { name: 'getFriendList', type: '(callback: (arg: FriendInfo[]) => void): void', required: true, description: '获取好友列表' },
    { name: 'getGroupInfo', type: '(groupId: number, callback: (arg: GroupInfo) => void): void', required: true, description: '获取群信息' }
  ]"
  example="qq.sendGroupMessage(123456789, &quot;Hello NeoBot!&quot;)\n\nqq.getGroupMemberInfo(123456789, 987654321, (memberInfo) => {\n  console.log(&quot;成员昵称: &quot; + memberInfo.getNickname())\n})"
  example-description="发送群消息并获取群成员信息"
/>



<ApiInterfaceCN 
  interface-name="Config" 
  interface-type="interface" 
  description="配置接口，用于读取和写入配置文件"
  tip="Config 接口的数据类型严格性\n- Config 的各种 get 方法对数据类型有严格要求，类型不匹配时会抛出异常\n- getString() 只能获取字符串类型的值，如果值是数组或其他类型会抛出异常\n  - 错误示例: generalConfig.getString(&quot;enable-groups&quot;) 当该键的值是数组时会抛出 &quot;JSONObject[&quot;enable-groups&quot;] is not a string&quot;\n- getStringArray() 只能获取字符串数组，如果数组元素是数字会抛出异常\n  - 错误示例: generalConfig.getStringArray(&quot;numbers&quot;) 当数组包含数字时会抛出 &quot;JSONArray[0] is not a String&quot;\n- getNumberArray() 只能获取数字数组\n- getInt() 和 getDouble() 只能获取数字类型的值\n- getBoolean() 只能获取布尔类型的值\n\n注意: 使用 Config 的 get 方法前，需要确保配置文件中该键的值类型与方法要求的类型一致\n\nConfig 接口的键不存在时的行为\n- Config 的各种 get 方法在键不存在时会抛出异常，不会返回 null 或默认值\n- getString(), getInt(), getDouble(), getBoolean(), getStringArray(), getNumberArray() 等方法在键不存在时会抛出异常\n  - 错误示例: generalConfig.getString(&quot;non&quot;) 会抛出 &quot;JSONObject[&quot;non&quot;] not found&quot;\n- getMessage() 在键不存在时也会抛出异常\n\n解决方案:\n- 使用 has() 方法检查键是否存在\n- 使用 addOption() 方法为键设置默认值，这样即使键不存在也不会抛出异常\n  - 示例: generalConfig.addOption(&quot;myKey&quot;, &quot;defaultValue&quot;)\n\nConfig.has() 方法的潜在问题\n- has() 方法可能无法正确检测某些类型的配置项\n- 测试显示某些存在的键可能被 has() 返回 false\n  - 示例: generalConfig.has(&quot;enable-groups&quot;) 可能返回 false，即使该键存在于配置文件中\n\n注意: 不要完全依赖 has() 方法来判断键是否存在，建议结合 try-catch 使用\n\nConfig.put() 和 Config.addOption() 的区别\n- put() 方法可以添加新键值对，但不会持久化到配置文件\n  - 示例: generalConfig.put(&quot;test&quot;, &quot;value&quot;) 只在内存中有效\n- addOption() 方法也可以添加新键值对，并可以设置默认值\n  - 示例: generalConfig.addOption(&quot;test&quot;, &quot;defaultValue&quot;)\n\n注意: 两个方法都不会将修改持久化到配置文件，重启后修改会丢失"
  :parameters="[
    { name: 'getString', type: '(node: string): string', required: true, description: '获取字符串配置值' },
    { name: 'getDouble', type: '(node: string): number', required: true, description: '获取双精度浮点数配置值' },
    { name: 'getInt', type: '(node: string): number', required: true, description: '获取整数配置值' },
    { name: 'getBoolean', type: '(node: string): boolean', required: true, description: '获取布尔值配置值' },
    { name: 'has', type: '(node: string): boolean', required: true, description: '检查配置节点是否存在' },
    { name: 'put', type: '(node: string, value: any): void', required: true, description: '设置配置值（不持久化）' },
    { name: 'getKeys', type: '(): string[]', required: true, description: '获取所有配置节点键' },
    { name: 'getObject', type: '(node: string): Config', required: true, description: '获取配置对象' },
    { name: 'getArray', type: '(node: string): Config[]', required: true, description: '获取配置数组' },
    { name: 'getStringArray', type: '(node: string): string[]', required: true, description: '获取字符串数组配置值' },
    { name: 'getNumberArray', type: '(node: string): number[]', required: true, description: '获取数字数组配置值' },
    { name: 'getMessage', type: '(node: string): string', required: true, description: '获取消息配置值' },
    { name: 'addOption', type: '(node: string, defaultValue: any): void', required: true, description: '添加配置选项' }
  ]"
  example="messageConfig.addOption(&quot;game-notice.on-join&quot;, &quot;[NeoBot] ${playerName} 加入了游戏!&quot;)\n\nconst enable = generalConfig.getBoolean(&quot;whitelist.enable&quot;)\nconst prefixes = generalConfig.getStringArray(&quot;whitelist.prefix.bind&quot;)\nconst maxBindCount = generalConfig.getInt(&quot;whitelist.max-bind-count&quot;)"
  example-description="添加配置选项并读取各种类型的配置值"
/>



<ApiInterfaceCN 
  interface-name="Logger" 
  interface-type="interface" 
  description="日志接口，用于记录日志信息"
  tip="Logger 接口的 trace() 方法不存在\n- Logger 接口实际上不包含 trace() 方法\n- 调用 trace() 会抛出 &quot;Unknown identifier: trace&quot; 异常\n- d.ts 类型定义中的 trace() 是不准确的\n\n注意: 只能使用 info(), warn(), error(), debug() 四个方法\n\nLogger 接口的类型严格性\n- Logger 的所有方法只接受字符串类型参数\n- 传递非字符串类型会抛出类型转换异常\n- null 和 undefined 会被自动转换为字符串 &quot;null&quot;\n\n错误示例:\nlogger.info(12345);  // 抛出 &quot;Cannot convert '12345' to Java type 'java.lang.String'&quot;\nlogger.info(true);   // 抛出 &quot;Cannot convert 'true' to Java type 'java.lang.String'&quot;\nlogger.info({});     // 抛出 &quot;Cannot convert '{...}' to Java type 'java.lang.String'&quot;\nlogger.info([]);     // 抛出 &quot;Cannot convert '(n)[...]' to Java type 'java.lang.String'&quot;\n\n正确示例:\nlogger.info(&quot;12345&quot;);     // 输出: 12345\nlogger.info(&quot;true&quot;);      // 输出: true\nlogger.info(JSON.stringify({}));  // 输出: {}\nlogger.info(null);        // 输出: null\nlogger.info(undefined);   // 输出: null\n\n注意: 传递非字符串参数前应该先转换为字符串"
  :parameters="[
    { name: 'info', type: '(message: string): void', required: true, description: '记录信息级别日志' },
    { name: 'warn', type: '(message: string): void', required: true, description: '记录警告级别日志' },
    { name: 'error', type: '(message: string): void', required: true, description: '记录错误级别日志' },
    { name: 'debug', type: '(message: string): void', required: true, description: '记录调试级别日志' },
    { name: 'trace', type: '(message: string): void', required: true, description: '记录跟踪级别日志' }
  ]"
  example="const logger = plugin.getNeoLogger()\nlogger.info(&quot;插件已加载&quot;)\nlogger.warn(&quot;这是一个警告&quot;)\nlogger.error(&quot;发生错误&quot;)"
  example-description="获取日志记录器并记录不同级别的日志"
/>



<ApiInterfaceCN 
  interface-name="ScriptManager" 
  interface-type="interface" 
  description="脚本管理器接口，用于管理脚本和方法"
  tip="ScriptManager 接口的 callJsMethod() 参数传递规则\n- callJsMethod() 将所有参数打包成一个数组传递给方法\n- 方法签名应该接收一个数组参数，而不是多个独立参数\n- 如果方法期望数组但接收到单个值，会抛出 &quot;is not iterable&quot; 错误\n\n错误示例:\nscriptManager.addJsMethod(&quot;test.sum&quot;, (a, b) => {\n    return a + b;  // 这会失败，因为a和b不是数字\n});\nscriptManager.callJsMethod(&quot;test.sum&quot;, 1, 2);  // 抛出 &quot;1 is not iterable&quot;\n\n正确示例:\nscriptManager.addJsMethod(&quot;test.sum&quot;, (args) => {\n    return args[0] + args[1];  // 从数组中获取参数\n});\nscriptManager.callJsMethod(&quot;test.sum&quot;, 1, 2);  // 返回 3\n\n注意: 即使传递一个数组参数，也会被再次包装成数组的数组\n\nScriptManager 接口的 callJsMethod() 调用不存在的方法\n- 调用不存在的方法会抛出异常\n- 错误信息: &quot;Cannot invoke &quot;dev.neovoxel.neobot.util.ValueWithScript.getValue()&quot; because the return value of &quot;java.util.Map.get(Object)&quot; is null&quot;\n- 应该先使用 hasJsMethod() 检查方法是否存在\n\n示例:\nif (scriptManager.hasJsMethod(&quot;test.method&quot;)) {\n    const result = scriptManager.callJsMethod(&quot;test.method&quot;, args);\n} else {\n    logger.error(&quot;Method does not exist&quot;);\n}\n\n注意: 调用不存在的方法会导致空指针异常\n\nScriptManager 接口的 addJsMethod() 方法覆盖行为\n- 可以使用相同的方法名添加新方法\n- 旧方法会被新方法覆盖，不会抛出异常\n- 这允许动态更新方法实现\n\n示例:\nscriptManager.addJsMethod(&quot;test.method&quot;, () => {\n    return &quot;version 1&quot;;\n});\n\nscriptManager.addJsMethod(&quot;test.method&quot;, () => {\n    return &quot;version 2&quot;;  // 覆盖版本1\n});\n\n注意: 覆盖操作是静默的，不会发出警告\n\nScriptManager 接口的错误传播\n- 方法中抛出的错误会正确传播到调用者\n- 错误信息和方法内部抛出的一致\n- 调用者可以捕获并处理这些错误\n\n示例:\nscriptManager.addJsMethod(&quot;test.error&quot;, () => {\n    throw new Error(&quot;Custom error&quot;);\n});\n\ntry {\n    scriptManager.callJsMethod(&quot;test.error&quot;);\n} catch (e) {\n    logger.error(&quot;Caught: &quot; + e.message);  // 输出 &quot;Caught: Custom error&quot;\n}\n\n注意: 所有错误都应该在调用处进行适当的处理\n\nScriptManager 接口的 null 和 undefined 参数处理\n- null 和 undefined 参数会被传递给方法\n- 在数学运算中，null 和 undefined 会被当作 0 处理\n- 其他操作可能会产生不同的结果\n\n示例:\nscriptManager.addJsMethod(&quot;test.add&quot;, (args) => {\n    return args[0] + args[1];\n});\n\nscriptManager.callJsMethod(&quot;test.add&quot;, undefined, 5);  // 返回 0\nscriptManager.callJsMethod(&quot;test.add&quot;, null, 5);      // 返回 0\n\n注意: 应该在方法内部进行参数验证\n\nScriptManager 接口的 loadParser() 和 parse() 行为\n- loadParser() 会替换之前的解析器，不会抛出异常\n- parse() 使用当前加载的解析器处理内容\n- 解析器可以完全自定义内容的处理方式\n\n示例:\nscriptManager.loadParser((content) => {\n    return content.toUpperCase();\n});\n\nconst result = scriptManager.parse(&quot;hello&quot;);  // 返回 &quot;HELLO&quot;\n\n注意: 解析器是全局的，会影响所有后续的 parse() 调用"
  :parameters="[
    { name: 'loadParser', type: '(parser: (arg: string) => string): void', required: true, description: '加载解析器' },
    { name: 'parse', type: '(content: string): string', required: true, description: '解析内容' },
    { name: 'addJsMethod', type: '(name: string, method: (arg: any[]) => any): void', required: true, description: '添加 JavaScript 方法' },
    { name: 'hasJsMethod', type: '(name: string): boolean', required: true, description: '检查 JavaScript 方法是否存在' },
    { name: 'callJsMethod', type: '(name: string, ...args: any[]): any', required: true, description: '调用 JavaScript 方法' }
  ]"
  example="scriptManager.addJsMethod(&quot;util.configToGame&quot;, (content) => {\n  return content.replaceAll(&quot;&amp;&quot;, &quot;§&quot;)\n})\n\nscriptManager.addJsMethod(&quot;util.sendGroupTextMessage&quot;, (groupId, message) => {\n  const json = [{\n    &quot;type&quot;: &quot;text&quot;,\n    &quot;data&quot;: { &quot;text&quot;: message }\n  }]\n  qq.sendGroupMessage(groupId, JSON.stringify(json))\n})\n\nif (scriptManager.hasJsMethod(&quot;util.parseTextJsonMessage&quot;)) {\n  const parsed = scriptManager.callJsMethod(&quot;util.parseTextJsonMessage&quot;, jsonMessage)\n}"
  example-description="添加 JavaScript 方法，检查方法是否存在，调用方法"
/>


<ApiInterfaceCN 
  interface-name="StorageProvider" 
  interface-type="interface" 
  description="存储提供者接口，用于获取数据库存储"
  :parameters="[
    { name: 'getStorage', type: '(): DatabaseStorage', required: true, description: '获取数据库存储对象' },
    { name: 'getStorageType', type: '(): string', required: true, description: '获取存储类型' }
  ]"
  example="const storageProvider = plugin.getStorageProvider()\nconst storage = storageProvider.getStorage()\nconst storageType = storageProvider.getStorageType()\nconsole.log(&quot;存储类型: &quot; + storageType)"
  example-description="获取存储提供者并访问数据库存储"
/>


<ApiInterfaceCN 
  interface-name="Scheduler" 
  interface-type="interface" 
  description="调度器接口，用于执行计划任务"
  tip="Scheduler 接口的 submitAsync() 多线程限制\n- submitAsync() 在异步线程执行时会抛出异常\n- 错误信息: &quot;Multi threaded access requested by thread ... but is not allowed for language(s) js&quot;\n- JavaScript 引擎（GraalVM）不支持多线程访问\n- 应该使用 submit() 而不是 submitAsync()\n\n注意: submitAsync() 只适用于支持多线程的语言，JavaScript 必须使用 submit()\n\nScheduler 接口的延迟参数行为\n- 零延迟的任务会立即执行\n- 负延迟的任务也会立即执行（不会抛出异常）\n- 负延迟被当作零延迟处理\n\n注意: 如果需要延迟执行，确保延迟参数为正数\n\nScheduler 接口的脚本函数调用\n- 即使脚本名或函数名不存在，submit() 也不会在提交时抛出异常\n- 错误可能在任务执行时才发生\n- 需要确保脚本名和函数名正确\n\n注意: 提交任务前应该验证脚本和函数是否存在"
  :parameters="[
    { name: 'submit', type: '(task: () => void): void', required: true, description: '提交同步任务' },
    { name: 'submitAsync', type: '(task: () => void): void', required: true, description: '提交异步任务' },
    { name: 'submit', type: '(task: () => void, delay: number): void', required: true, description: '提交延迟任务' },
    { name: 'submitAsync', type: '(task: () => void, delay: number): void', required: true, description: '提交延迟异步任务' },
    { name: 'submit', type: '(task: () => void, delay: number, period: number): void', required: true, description: '提交延迟周期任务' },
    { name: 'submitAsync', type: '(task: () => void, delay: number, period: number): void', required: true, description: '提交延迟周期异步任务' },
    { name: 'submit', type: '(scriptName: string, functionName: string, delay: number): void', required: true, description: '提交脚本延迟任务' },
    { name: 'submitAsync', type: '(scriptName: string, functionName: string, delay: number): void', required: true, description: '提交脚本延迟异步任务' },
    { name: 'submit', type: '(scriptName: string, functionName: string, delay: number, period: number): void', required: true, description: '提交脚本延迟周期任务' },
    { name: 'submitAsync', type: '(scriptName: string, functionName: string, delay: number, period: number): void', required: true, description: '提交脚本延迟周期异步任务' }
  ]"
  example="plugin.getScriptScheduler().submit(() => {\n  console.log(&quot;执行同步任务&quot;)\n})\n\nplugin.getScriptScheduler().submitAsync(() => {\n  console.log(&quot;执行异步任务&quot;)\n})\n\nplugin.getScriptScheduler().submit(() => {\n  console.log(&quot;5秒后执行的任务&quot;)\n}, 5000)\n\nplugin.getScriptScheduler().submit(() => {\n  console.log(&quot;每10秒执行一次的任务&quot;)\n}, 1000, 10000)"
  example-description="使用调度器执行各种类型的任务"
/>



<ApiInterfaceCN 
  interface-name="NeoBot" 
  interface-type="interface" 
  description="NeoBot 主接口，提供核心功能"
  :parameters="[
    { name: 'getNeoLogger', type: '(): Logger', required: true, description: '获取日志记录器' },
    { name: 'getStorageProvider', type: '(): StorageProvider', required: true, description: '获取存储提供者' },
    { name: 'getScriptScheduler', type: '(): Scheduler', required: true, description: '获取脚本调度器' },
    { name: 'broadcast', type: '(message: string): void', required: true, description: '广播消息到所有玩家' },
    { name: 'getOnlinePlayers', type: '(): Player[]', required: true, description: '获取所有在线玩家' },
    { name: 'getOnlinePlayer', type: '(name: string): Player', required: true, description: '获取指定名称的在线玩家' },
    { name: 'getOfflinePlayer', type: '(name: string): OfflinePlayer', required: true, description: '获取指定名称的离线玩家' },
    { name: 'parsePlaceholder', type: '(message: string, player: Player): string', required: true, description: '解析占位符' },
    { name: 'getPlatform', type: '(): string', required: true, description: '获取平台信息' }
  ]"
  example="const logger = plugin.getNeoLogger()\nconst storage = plugin.getStorageProvider().getStorage()\nconst scheduler = plugin.getScriptScheduler()\n\nplugin.broadcast(&quot;服务器公告: 欢迎来到服务器!&quot;)\n\nconst players = plugin.getOnlinePlayers()\nconsole.log(&quot;当前在线玩家数: &quot; + players.length)\n\nconst player = plugin.getOnlinePlayer(&quot;Steve&quot;)\nif (player) {\n  const message = plugin.parsePlaceholder(&quot;欢迎 ${player_name} 回到服务器!&quot;, player)\n  player.sendMessage(message)\n}"
  example-description="使用 NeoBot 主接口的各种功能"
/>



<ApiInterfaceCN 
  interface-name="Enum" 
  interface-type="interface" 
  description="枚举接口，提供枚举类型的基本方法"
  :parameters="[
    { name: 'toString', type: '() => string', required: true, description: '将枚举值转换为字符串' }
  ]"
  example="const role = memberInfo.getRole()\nconsole.log(&quot;成员角色: &quot; + role.toString())"
  example-description="获取群成员角色并转换为字符串输出"
/>


