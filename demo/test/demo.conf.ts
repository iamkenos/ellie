import { IConfig } from "@iamkenos/ellie";

const config: Partial<IConfig> = {
  baseUrl: "http://localhost:8080",
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": { args: ["--disable-web-security", "--incognito", "--headless"] }
    }
  ],
  comparable: {
    ajaxRequest: { skipCompare: false },
    httpResponse: { skipCompare: false },
    imageCompare: {
      skipCompare: false,
      overridePlatform: false,
      overrideVersion: true,
      options: {
        scaleImagesToSameSize: true,
        saveAboveTolerance: 0.9
      }
    }
  },
  logLevel: "error",
  seleniumInstallArgs: { drivers: { chrome: { version: "89.0.4389.23" } } },
  specs: ["./features/**/*.feature"],
  steps: ["./fixtures/**/**/*.def.ts"],
  meta: ["./fixtures/**/*.meta.ts"],
  waitforTimeout: 8000
};

export default config;
