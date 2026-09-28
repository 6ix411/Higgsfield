import "server-only";
import type { ExchangeRateProvider } from "./types";

export type { ExchangeRateProvider, ExchangeRateQuote, ExchangeRateSource } from "./types";

/**
 * Returns the exchange-rate provider selected by the EXCHANGE_RATE_PROVIDER
 * environment variable.
 *
 * No provider is implemented yet — that happens in the Import Analyzer step.
 * Until then this throws, and the app will ask the user to enter a rate manually.
 */
export function getExchangeRateProvider(): ExchangeRateProvider {
  const selected = process.env.EXCHANGE_RATE_PROVIDER;
  switch (selected) {
    // case "open-er-api": return new OpenErApiProvider();   // added in a later step
    default:
      throw new Error(
        `No exchange-rate provider configured (EXCHANGE_RATE_PROVIDER="${selected ?? ""}"). ` +
          "Enter exchange rates manually for now.",
      );
  }
}
