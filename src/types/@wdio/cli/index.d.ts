/// <reference types="@wdio/sync" />

declare module "@wdio/cli" {
  export default class Launcher {
    public constructor(configFile: string, argv: any, isWatchMode: boolean);

    public run(): Promise<any>;
  }
}
