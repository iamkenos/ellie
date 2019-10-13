export function normalizeFunctionName(name: string): string {
  return name
    .replace(/([A-Z][a-z])/g, " $1")
    .replace(/^./, (str: string) => str.toUpperCase())
    .replace(/[()]/g, "");
}
