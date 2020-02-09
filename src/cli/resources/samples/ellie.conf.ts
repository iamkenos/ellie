import { IConfig } from "@iamkenos/ellie";

export default {
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
} as IConfig;
