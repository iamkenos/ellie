import { IConfig } from "../../build";
import base from "./demo.conf";

const config: IConfig = Object.assign({}, base, {
  browserstackEnabled: true,
  browserstackLocal: true,
  user: "user",
  key: "key",
  specs: ["./features/**/vi-*.feature"],
  capabilities: [
    {
      browserName: "Chrome",
      browserVersion: "87",
      "goog:chromeOptions": { args: ["--disable-web-security", "--incognito"] },
      "bstack:options": {
        projectName: "ellie",
        buildName: "demo: browserstack tests",
        os: "OS X",
        osVersion: "Catalina",
        local: "true",
        seleniumVersion: "3.141.59",
        seleniumLogs: "false",
        resolution: "1920x1080",
        timezone: "Singapore"
      }
    }
  ]
});

export default config;
