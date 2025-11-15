# 接口文件

::: warning 注意
本章节内容为 NeoBot 脚本开发的接口文件说明，适用于有一定编程基础的用户。如您是初次使用 NeoBot，建议先阅读[快速开始](../../quick-started)。
:::
::: tip 提示
已注释大部分接口和方法的功能说明，方便开发者理解和使用。如有任何疑问或建议，欢迎加入[官方交流群](https://qm.qq.com/q/hRC6znrdPq)进行交流。
:::
```ts
// filepath: plugins/NeoBot/scripts/NeoBot.d.ts
// 基础 QQ 事件接口
declare interface QQEvent {
  getSelfId(): number; // 获取机器人自身 ID
  getTime(): number; // 获取事件发生时间戳
}

// 群消息事件接口
declare interface GroupMessageEvent extends QQEvent {
  getGroupId(): number; // 获取群号
  getMessageId(): number; // 获取消息 ID
  getSenderId(): number; // 获取发送者 QQ 号
  getRawMessage(): string; // 获取原始消息内容
  getJsonMessage(): string; // 获取 JSON 格式消息
}

// 重复声明，建议删除或合并到上面的 GroupMessageEvent
declare interface GroupMessageEvent extends QQEvent {
  getMessageId(): number;
  getSenderId(): number;
  getRawMessage(): string;
}

// 好友添加事件
declare interface FriendAddEvent extends QQEvent {
  getUserId(): number; // 获取好友 QQ 号
}

// 群成员减少事件（成员离开/被踢）
declare interface GroupDecreaseEvent extends QQEvent {
  getUserId(): number; // 事件相关用户 ID
  getOperatorId(): number; // 操作者 ID（如果是被踢）
  getGroupId(): number; // 群号
}

// 群成员增加事件（新成员加入）
declare interface GroupIncreaseEvent extends QQEvent {
  getUserId(): number; // 新成员 ID
  getOperatorId(): number; // 邀请者 ID（如果有）
  getGroupId(): number; // 群号
}

// 戳一戳事件
declare interface PokeEvent extends QQEvent {
  getUserId(): number; // 发送戳一戳的用户 ID
  getGroupId(): number; // 群号（如果是群内戳一戳）
  getTargetId(): number; // 被戳用户 ID
}

// 好友请求事件
declare interface FriendRequestEvent extends QQEvent {
  getUserId(): number; // 请求者 ID
  getComment(): string; // 验证信息
  getFlag(): string; // 请求标识，用于处理请求
}

// 群请求事件（加群请求）
declare interface GroupRequestEvent extends QQEvent {
  getUserId(): number; // 请求者 ID
  getGroupId(): number; // 群号
  getComment(): string; // 验证信息
  getFlag(): string; // 请求标识，用于处理请求
}

// 基础用户信息
declare interface BasicInfo {
  getUserId(): number; // 用户 ID
  getNickname(): string; // 用户昵称
}

// 群成员详细信息
declare interface GroupMemberInfo {
  getGroupId(): number; // 群号
  getUserId(): number; // 用户 ID
  getNickname(): string; // 昵称
  getCard(): string; // 群名片
  getAge(): number; // 年龄
  getArea(): string; // 地区
  getJoinTime(): number; // 加群时间
  getLastSentTime(): number; // 最后发言时间
  getLevel(): string; // 等级
  getTitle(): string; // 特殊头衔
  getTitleExpireTime(): number; // 头衔过期时间
  getCardChangeable(): boolean; // 名片是否可修改
  getRole(): Object; // 群角色
}

// QQ 机器人核心功能接口
declare interface QQ {
  // 事件注册
  register(eventName: string, callback: (arg: QQEvent) => void): void;

  // 消息发送
  sendGroupMessage(groupId: number, message: string): void;
  sendPrivateMessage(userId: number, message: string): void;

  // 群管理
  renameGroupMember(groupId: number, userId: number, newName: string): void;
  muteGroupMember(groupId: number, userId: number, duration: number): void;
  muteAllGroupMember(groupId: number): void;
  unMuteAllGroupMember(groupId: number): void;
  kickGroupMember(groupId: number, userId: number): void;

  // 请求处理
  approveGroupRequest(flag: string, type: string): void;
  rejectGroupRequest(flag: string, type: string): void;
  rejectFriendRequest(flag: string): void;
  approveFriendRequest(flag: string): void;

  // 群成员信息获取
  getGroupMemberList(
    groupId: number,
    callback: (arg: BasicInfo[]) => void,
  ): void;
  getGroupMemberInfo(
    groupId: number,
    userId: number,
    callback: (arg: GroupMemberInfo) => void,
  ): void;
}

declare const qq: QQ; // QQ 实例

// 游戏相关事件接口
declare interface LoginEvent {
  getName(): string;
  disallow(reason: string): void; // 阻止登录
}

declare interface JoinEvent extends Player {} // 玩家加入事件

declare interface QuitEvent extends Player {} // 玩家退出事件

// 游戏聊天事件
declare interface ChatEvent {
  getPlayer(): Player; // 获取发言玩家
  getMessage(): string; // 获取消息内容
  disallow(): void; // 阻止消息发送
}

// 玩家接口
declare interface Player {
  getName(): string; // 获取玩家名
  sendMessage(message: string): void; // 向玩家发送消息
  kick(message: string): void; // 踢出玩家
}

// 游戏事件系统
declare interface Game {
  register(eventName: string, callback: (arg: any[]) => void): void;
}

declare const gameEvent: Game; // 游戏事件实例

// 命令发送者接口
declare interface CommandSender {
  getName(): string;
  sendMessage(message: string): void;
  hasPermission(permission: string): boolean; // 检查权限
}

// 游戏命令系统
declare interface GameCommand {
  onCommand(callback: (sender: CommandSender, args: string[]) => void): void;
}

declare const gameCommand: GameCommand; // 游戏命令实例

// 配置管理接口
declare interface Config {
  // 配置值获取
  getString(node: string): string;
  getDouble(node: string): number;
  getInt(node: string): number;
  getBoolean(node: string): boolean;
  has(node: string): boolean;

  // 配置操作
  put(node: string, value: any): void; // 临时修改配置（不持久化）
  getKeys(): string[]; // 获取所有配置键
  getObject(node: string): Config; // 获取对象配置
  getArray(node: string): Config[]; // 获取数组配置
  getStringArray(node: string): string[]; // 获取字符串数组
  getNumberArray(node: string): number[]; // 获取数字数组
  getMessage(node: string): string; // 获取消息配置

  // 配置选项管理
  addOption(node: string, defaultValue: any): void;
}

// 配置实例
declare const generalConfig: Config; // 通用配置
declare const messageConfig: Config; // 消息配置

// 日志接口
declare interface Logger {
  info(message: string): void; // 信息日志
  warn(message: string): void; // 警告日志
  error(message: string): void; // 错误日志
  debug(message: string): void; // 调试日志
  trace(message: string): void; // 跟踪日志
}

// 数据库表创建器
declare interface DatabaseCreator {
  column(name: string, type: string, extraOptions: string): DatabaseCreator;
  execute(): void; // 执行创建
}

// 数据库行数据接口
declare interface Row {
  getString(column: string): string;
  getInt(column: string): number;
  getLong(column: string): number;
  getFloat(column: string): number;
  getDouble(column: string): number;
  getBoolean(column: string): boolean;
  getObject(column: string): any;
  getObject<T>(column: string, type: T): T; // 泛型方式获取对象
}

// 查询结果接口
declare interface Result {
  map(): Row[]; // 获取所有行
  getFirst(): Row; // 获取第一行
  get(index: number): Row; // 获取指定行
}

// 数据库查询器
declare interface DatabaseSelector {
  all(): DatabaseSelector; // 选择所有列
  column(column: string): DatabaseSelector; // 选择指定列
  column(column: string[]): DatabaseSelector; // 选择多个列
  where(column: string, value: any): DatabaseSelector; // 条件查询
  where(column: string, operator: string, value: any): DatabaseSelector; // 带操作符的条件查询
  execute(): Result; // 执行查询
}

// 数据库更新器
declare interface DatabaseUpdater {
  set(column: string, value: any): DatabaseUpdater; // 设置更新值
  where(column: string, value: any): DatabaseUpdater; // 更新条件
  where(column: string, operator: string, value: any): DatabaseUpdater; // 带操作符的更新条件
  execute(): void; // 执行更新
}

// 数据库插入器
declare interface DatabaseInserter {
  column(column: string, value: any): DatabaseInserter; // 设置插入列和值
  execute(): void; // 执行插入
}

// 数据库表结构修改器
declare interface DatabaseModifier {
  add(name: string, type: string): DatabaseModifier; // 添加列
  add(name: string, type: string, extraOptions: string): DatabaseModifier; // 添加带选项的列
  remove(name: string): DatabaseModifier; // 删除列
  execute(): void; // 执行修改
}

// 数据库表操作接口
declare interface DatabaseTable {
  delete(): void; // 删除表
  select(columns: string[]): DatabaseSelector; // 查询数据
  create(): DatabaseCreator; // 创建表
  update(): DatabaseUpdater; // 更新数据
  insert(): DatabaseInserter; // 插入数据
  alter(): DatabaseModifier; // 修改表结构
}

// 数据库存储接口
declare interface DatabaseStorage {
  table(name: string): DatabaseTable; // 获取表操作对象
}

// 在线玩家接口（扩展离线玩家）
declare interface Player extends OfflinePlayer {
  sendMessage(message: string): void;
  hasPermission(permission: string): boolean;
  kick(message: string): void;
}

// 离线玩家接口
declare interface OfflinePlayer {
  getName(): string; // 获取玩家名
  isOnline(): boolean; // 检查是否在线
}

// 脚本管理器接口
declare interface ScriptManager {
  loadParser(parser: (arg: string) => string): void; // 加载解析器
  parse(content: string): string; // 解析内容
  addJsMethod(name: string, method: (arg: any[]) => any): void; // 添加JS方法
  hasJsMethod(name: string): boolean; // 检查方法是否存在
  callJsMethod(name: string, args: any[]): any; // 调用JS方法
}

declare const scriptManager: ScriptManager; // 脚本管理器实例

// 原生 Object 扩展（TypeScript 内置）
declare interface Object {
  toString(): string;
}

// 命令执行器接口
declare interface Executor {
  init(): boolean; // 初始化
  execute(command: string): void; // 执行命令
  getResult(): string; // 获取执行结果
}

// 任务接口
declare interface Task {
  cancel(): void; // 取消任务
}

// NeoBot 核心插件接口
declare interface NeoBot {
  // 基础功能
  getNeoLogger(): Logger; // 获取日志器
  getStorage(): DatabaseStorage; // 获取数据库存储
  getStorageType(): string; // 获取存储类型

  // 消息和玩家管理
  broadcast(message: string): void; // 全服广播
  getOnlinePlayers(): Player[]; // 获取在线玩家列表
  getOnlinePlayer(name: string): Player; // 获取在线玩家
  getOfflinePlayer(name: string): OfflinePlayer; // 获取离线玩家

  // 功能扩展
  parsePlaceholder(message: string, player: Player): string; // 解析占位符
  isPluginLoaded(name: string): boolean; // 检查插件是否加载
  getPlatform(): string; // 获取运行平台

  // 命令执行
  getExecutorByName(name: string): Executor; // 获取命令执行器

  // 任务调度
  submit(task: () => void): Task; // 提交即时任务
  submitAsync(task: () => void): Task; // 提交异步即时任务
  submit(task: () => void, delay: number): Task; // 提交延迟任务
  submitAsync(task: () => void, delay: number): Task; // 提交异步延迟任务
  submit(task: () => void, delay: number, period: number): Task; // 提交定时任务
  submitAsync(task: () => void, delay: number, period: number): Task; // 提交异步定时任务
}

declare const plugin: NeoBot; // NeoBot 插件实例
```

3. 保存并关闭配置文件。
