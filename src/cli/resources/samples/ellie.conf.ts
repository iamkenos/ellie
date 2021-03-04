import { IConfig } from "@iamkenos/ellie";

const config: IConfig = {
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": { args: ["--disable-web-security", "--incognito"] }
    }
  ],
  // use a chrome driver version that fits your current browser version
  // https://www.browserstack.com/automate/capabilities?tag=selenium-4
  seleniumInstallArgs: { version: "3.141.59", drivers: { chrome: { version: "88.0.4324.27" } } },
  logLevel: "error",
  pages: ["./fixtures/**/*.meta.ts"],
  specs: ["./features/**/*.feature"],
  steps: ["./fixtures/**/*.def.ts"],
  hooks: {
    before: "./fixtures/hooks/before",
    afterScenario: "./fixtures/hooks/afterScenario"
  }
};

export default config;
