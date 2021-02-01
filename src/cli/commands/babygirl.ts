import { TLOU_QUOTES } from "../config";

export function endureAndSurvive() {
  const toons = Object.keys(TLOU_QUOTES);
  const toon = toons[Math.floor(Math.random() * toons.length)];
  const quotes = TLOU_QUOTES[toon];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  console.log(`\n${toon}: ${quote}\n`);
  process.exit(0);
}
