/// <reference types="@wdio/sync" />

declare module "@wdio/cli" {
  export default class Launcher {
    constructor(configFile: string, argv: any, isWatchMode: boolean);

    run(): Promise<any>;
  }
}
