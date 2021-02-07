import { IConfig } from "@iamkenos/ellie";
import base from "./demo.conf";
import dotenv from "dotenv";
dotenv.config();

const config: IConfig = Object.assign({}, base, {
  browserstackEnabled: true,
  browserstackLocal: true,
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
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
