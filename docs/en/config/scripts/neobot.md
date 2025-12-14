# API Documentation

::: warning Note
The content in this chapter is the API documentation for NeoBot script development, suitable for users with some programming foundation. If you are new to NeoBot, it is recommended to read [Quick Start](../../quick-started) first.
:::

::: tip Tip
Most interfaces and methods have been commented with functional descriptions to facilitate developer understanding and use. If you have any questions or suggestions, you are welcome to join the [Official Communication Group](https://qm.qq.com/q/hRC6znrdPq) for discussion.
:::

```ts
// filepath: plugins/NeoBot/scripts/NeoBot.d.ts
// Basic QQ event interface
declare interface QQEvent {
  getSelfId(): number; // Get the bot's own ID
  getTime(): number; // Get the event timestamp
}

// Group message event interface
declare interface GroupMessageEvent extends QQEvent {
  getGroupId(): number; // Get group ID
  getMessageId(): number; // Get message ID
  getSenderId(): number; // Get sender QQ number
  getRawMessage(): string; // Get original message content
  getJsonMessage(): string; // Get JSON format message
}

// Duplicate declaration, recommended to delete or merge with the GroupMessageEvent above
declare interface GroupMessageEvent extends QQEvent {
  getMessageId(): number;
  getSenderId(): number;
  getRawMessage(): string;
}

// Friend addition event
declare interface FriendAddEvent extends QQEvent {
  getUserId(): number; // Get friend QQ number
}

// Group member decrease event (member leaves/is kicked)
declare interface GroupDecreaseEvent extends QQEvent {
  getUserId(): number; // Event-related user ID
  getOperatorId(): number; // Operator ID (if kicked)
  getGroupId(): number; // Group ID
}

// Group member increase event (new member joins)
declare interface GroupIncreaseEvent extends QQEvent {
  getUserId(): number; // New member ID
  getOperatorId(): number; // Inviter ID (if any)
  getGroupId(): number; // Group ID
}

// Poke event
declare interface PokeEvent extends QQEvent {
  getUserId(): number; // User ID of the poke sender
  getGroupId(): number; // Group ID (if it's a group poke)
  getTargetId(): number; // User ID of the poked user
}

// Friend request event
declare interface FriendRequestEvent extends QQEvent {
  getUserId(): number; // Requester ID
  getComment(): string; // Verification message
  getFlag(): string; // Request identifier for handling the request
}

// Group request event (join group request)
declare interface GroupRequestEvent extends QQEvent {
  getUserId(): number; // Requester ID
  getGroupId(): number; // Group ID
  getComment(): string; // Verification message
  getFlag(): string; // Request identifier for handling the request
}

// Basic user information
declare interface BasicInfo {
  getUserId(): number; // User ID
  getNickname(): string; // User nickname
}

// Group member detailed information
declare interface GroupMemberInfo {
  getGroupId(): number; // Group ID
  getUserId(): number; // User ID
  getNickname(): string; // Nickname
  getCard(): string; // Group card
  getAge(): number; // Age
  getArea(): string; // Region
  getJoinTime(): number; // Join time
  getLastSentTime(): number; // Last发言时间
  getLevel(): string; // Level
  getTitle(): string; // Special title
  getTitleExpireTime(): number; // Title expiration time
  getCardChangeable(): boolean; // Whether card can be modified
  getRole(): Object; // Group role
}

// QQ bot core functionality interface
declare interface QQ {
  // Event registration
  register(eventName: string, callback: (arg: QQEvent) => void): void;

  // Message sending
  sendGroupMessage(groupId: number, message: string): void;
  sendPrivateMessage(userId: number, message: string): void;

  // Group management
  renameGroupMember(groupId: number, userId: number, newName: string): void;
  muteGroupMember(groupId: number, userId: number, duration: number): void;
  muteAllGroupMember(groupId: number): void;
  unMuteAllGroupMember(groupId: number): void;
  kickGroupMember(groupId: number, userId: number): void;

  // Request handling
  approveGroupRequest(flag: string, type: string): void;
  rejectGroupRequest(flag: string, type: string): void;
  rejectFriendRequest(flag: string): void;
  approveFriendRequest(flag: string): void;

  // Group member information retrieval
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

declare const qq: QQ; // QQ instance

// Game-related event interfaces
declare interface LoginEvent {
  getName(): string;
  disallow(reason: string): void; // Prevent login
}

declare interface JoinEvent extends Player {} // Player join event

declare interface QuitEvent extends Player {} // Player quit event

// Game chat event
declare interface ChatEvent {
  getPlayer(): Player; // Get speaking player
  getMessage(): string; // Get message content
  disallow(): void; // Prevent message sending
}

// Player interface
declare interface Player {
  getName(): string; // Get player name
  sendMessage(message: string): void; // Send message to player
  kick(message: string): void; // Kick player
}

// Game event system
declare interface Game {
  register(eventName: string, callback: (arg: any[]) => void): void;
}

declare const gameEvent: Game; // Game event instance

// Command sender interface
declare interface CommandSender {
  getName(): string;
  sendMessage(message: string): void;
  hasPermission(permission: string): boolean; // Check permission
}

// Game command system
declare interface GameCommand {
  onCommand(callback: (sender: CommandSender, args: string[]) => void): void;
}

declare const gameCommand: GameCommand; // Game command instance

// Configuration management interface
declare interface Config {
  // Configuration value retrieval
  getString(node: string): string;
  getDouble(node: string): number;
  getInt(node: string): number;
  getBoolean(node: string): boolean;
  has(node: string): boolean;

  // Configuration operations
  put(node: string, value: any): void; // Temporary configuration modification (not persistent)
  getKeys(): string[]; // Get all configuration keys
  getObject(node: string): Config; // Get object configuration
  getArray(node: string): Config[]; // Get array configuration
  getStringArray(node: string): string[]; // Get string array
  getNumberArray(node: string): number[]; // Get number array
  getMessage(node: string): string; // Get message configuration

  // Configuration option management
  addOption(node: string, defaultValue: any): void;
}

// Configuration instances
declare const generalConfig: Config; // General configuration
declare const messageConfig: Config; // Message configuration

// Logger interface
declare interface Logger {
  info(message: string): void; // Information log
  warn(message: string): void; // Warning log
  error(message: string): void; // Error log
  debug(message: string): void; // Debug log
  trace(message: string): void; // Trace log
}

// Database table creator
declare interface DatabaseCreator {
  column(name: string, type: string, extraOptions: string): DatabaseCreator;
  execute(): void; // Execute creation
}

// Database row data interface
declare interface Row {
  getString(column: string): string;
  getInt(column: string): number;
  getLong(column: string): number;
  getFloat(column: string): number;
  getDouble(column: string): number;
  getBoolean(column: string): boolean;
  getObject(column: string): any;
  getObject<T>(column: string, type: T): T; // Get object in generic way
}

// Query result interface
declare interface Result {
  map(): Row[]; // Get all rows
  getFirst(): Row; // Get first row
  get(index: number): Row; // Get specified row
}

// Database query selector
declare interface DatabaseSelector {
  all(): DatabaseSelector; // Select all columns
  column(column: string): DatabaseSelector; // Select specified column
  column(column: string[]): DatabaseSelector; // Select multiple columns
  where(column: string, value: any): DatabaseSelector; // Conditional query
  where(column: string, operator: string, value: any): DatabaseSelector; // Conditional query with operator
  execute(): Result; // Execute query
}

// Database updater
declare interface DatabaseUpdater {
  set(column: string, value: any): DatabaseUpdater; // Set update value
  where(column: string, value: any): DatabaseUpdater; // Update condition
  where(column: string, operator: string, value: any): DatabaseUpdater; // Update condition with operator
  execute(): void; // Execute update
}

// Database inserter
declare interface DatabaseInserter {
  column(column: string, value: any): DatabaseInserter; // Set insert column and value
  execute(): void; // Execute insert
}

// Database table structure modifier
declare interface DatabaseModifier {
  add(name: string, type: string): DatabaseModifier; // Add column
  add(name: string, type: string, extraOptions: string): DatabaseModifier; // Add column with options
  remove(name: string): DatabaseModifier; // Remove column
  execute(): void; // Execute modification
}

// Database table operation interface
declare interface DatabaseTable {
  delete(): void; // Delete table
  select(columns: string[]): DatabaseSelector; // Query data
  create(): DatabaseCreator; // Create table
  update(): DatabaseUpdater; // Update data
  insert(): DatabaseInserter; // Insert data
  alter(): DatabaseModifier; // Modify table structure
}

// Database storage interface
declare interface DatabaseStorage {
  table(name: string): DatabaseTable; // Get table operation object
}

// Online player interface (extends offline player)
declare interface Player extends OfflinePlayer {
  sendMessage(message: string): void;
  hasPermission(permission: string): boolean;
  kick(message: string): void;
}

// Offline player interface
declare interface OfflinePlayer {
  getName(): string; // Get player name
  isOnline(): boolean; // Check if online
}

// Script manager interface
declare interface ScriptManager {
  loadParser(parser: (arg: string) => string): void; // Load parser
  parse(content: string): string; // Parse content
  addJsMethod(name: string, method: (arg: any[]) => any): void; // Add JS method
  hasJsMethod(name: string): boolean; // Check if method exists
  callJsMethod(name: string, args: any[]): any; // Call JS method
}

declare const scriptManager: ScriptManager; // Script manager instance

// Native Object extension (TypeScript built-in)
declare interface Object {
  toString(): string;
}

// Command executor interface
declare interface Executor {
  init(): boolean; // Initialize
  execute(command: string): void; // Execute command
  getResult(): string; // Get execution result
}

// Task interface
declare interface Task {
  cancel(): void; // Cancel task
}

// NeoBot core plugin interface
declare interface NeoBot {
  // Basic functionality
  getNeoLogger(): Logger; // Get logger
  getStorage(): DatabaseStorage; // Get database storage
  getStorageType(): string; // Get storage type

  // Message and player management
  broadcast(message: string): void; // Server broadcast
  getOnlinePlayers(): Player[]; // Get online player list
  getOnlinePlayer(name: string): Player; // Get online player
  getOfflinePlayer(name: string): OfflinePlayer; // Get offline player

  // Feature extensions
  parsePlaceholder(message: string, player: Player): string; // Parse placeholder
  isPluginLoaded(name: string): boolean; // Check if plugin is loaded
  getPlatform(): string; // Get running platform

  // Command execution
  getExecutorByName(name: string): Executor; // Get command executor

  // Task scheduling
  submit(task: () => void): Task; // Submit immediate task
  submitAsync(task: () => void): Task; // Submit asynchronous immediate task
  submit(task: () => void, delay: number): Task; // Submit delayed task
  submitAsync(task: () => void, delay: number): Task; // Submit asynchronous delayed task
  submit(task: () => void, delay: number, period: number): Task; // Submit scheduled task
  submitAsync(task: () => void, delay: number, period: number): Task; // Submit asynchronous scheduled task
}

declare const plugin: NeoBot; // NeoBot plugin instance
```

3. Save and close the configuration file.