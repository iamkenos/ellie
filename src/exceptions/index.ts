export class ExpectedConditionsError extends Error {
  constructor(key: string) {
    super(key);
    this.name = "ExpectedConditionsError";
  }
}
