import type { CurrencyCode } from "@/lib/currency/currencies";

/**
 * Where a rate came from. Nigerian importers often pay a different rate from
 * the official one, so the user can always override with their own rate.
 */
export type ExchangeRateSource = "provider" | "user_override";

export interface ExchangeRateQuote {
  from: CurrencyCode;
  to: CurrencyCode;
  /** 1 unit of `from` = `rate` units of `to`. */
  rate: number;
  /** When the provider published this rate (ISO 8601). */
  asOf: string;
  source: ExchangeRateSource;
  /** Human-readable provider name, e.g. "open.er-api.com". Shown to the user. */
  providerName: string;
}

/**
 * Any exchange-rate service must implement this interface.
 * To switch providers, write a new class that implements it and register it
 * in ./index.ts — nothing else in the app needs to change.
 */
export interface ExchangeRateProvider {
  readonly name: string;
  getRate(from: CurrencyCode, to: CurrencyCode): Promise<ExchangeRateQuote>;
}
