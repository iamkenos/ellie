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
  seleniumInstallArgs: { version: "3.141.59", drivers: { chrome: { version: "87.0.4280.88" } } },
  logLevel: "error",
  pages: ["./pages/**/*.meta.ts"],
  specs: ["./features/**/*.feature"],
  steps: ["./steps/definitions/**/*.ts"],
  hooks: {
    before: "./hooks/before",
    afterScenario: "./hooks/afterScenario"
  }
};

export default config;
