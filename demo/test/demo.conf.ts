import { IConfig } from "../../build";

const config: IConfig = {
  baseUrl: "http://localhost:8080",
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": { args: ["--disable-web-security", "--incognito", "--headless"] }
    }
  ],
  comparable: {
    ajaxRequest: { outputDir: ".comparable/ajax", skipCompare: false },
    httpResponse: { outputDir: ".comparable/http", skipCompare: false },
    imageCompare: { outputDir: ".comparable/image", skipCompare: false }
  },
  hooks: {
    before: "./.hooks/before",
    afterScenario: "./.hooks/afterScenario"
  },
  logLevel: "error",
  specs: ["./features/**/*.feature"],
  steps: ["./steps/**/**/*.def.ts"],
  pages: ["./pages/**/*.meta.ts"],
  waitforTimeout: 8000
};

export default config;
