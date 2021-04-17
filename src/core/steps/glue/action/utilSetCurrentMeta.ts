export default (action: string, key: string): void => {
  (browser.config as any).currentMeta = action.includes("stop") ? undefined : key;
};
