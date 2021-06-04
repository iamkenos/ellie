import { IConfig } from "@iamkenos/ellie";

const config: Partial<IConfig> = {
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--disable-gpu",
          "--disable-web-security",
          "--window-size=1920,1080",
          // you can uncomment this option to run tests in headless mode
          // "--headless",
          "--incognito"
        ]
      }
    }
  ],
  seleniumInstallArgs: { drivers: { chrome: { version: "latest" } } },
  logLevel: "error",
  meta: ["./fixtures/**/*.meta.ts"],
  specs: ["./features/**/*.feature"],
  steps: ["./fixtures/**/*.def.ts"],
  hooks: { before: "./fixtures/hooks/before" }
};

export default config;
