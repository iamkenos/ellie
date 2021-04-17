export default (action: string, key: string): void => {
  (browser.config as any).currentMetaChild = action.includes("stop") ? undefined : key;
};
