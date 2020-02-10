import { IConfig } from "@iamkenos/ellie";

const config: IConfig = {
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": { args: ["--disable-web-security", "--incognito"] }
    }
  ],
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
