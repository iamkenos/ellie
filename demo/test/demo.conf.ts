import { IConfig } from "@iamkenos/ellie";

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
    before: "./fixtures/hooks/before",
    afterScenario: "./fixtures/hooks/afterScenario"
  },
  logLevel: "error",
  // use a chrome driver version that fits your current browser version
  // https://www.browserstack.com/automate/capabilities?tag=selenium-4
  seleniumInstallArgs: { version: "3.141.59", drivers: { chrome: { version: "87.0.4280.88" } } },
  specs: ["./features/**/*.feature"],
  steps: ["./fixtures/**/**/*.def.ts"],
  pages: ["./fixtures/**/*.meta.ts"],
  waitforTimeout: 8000
};

export default config;
