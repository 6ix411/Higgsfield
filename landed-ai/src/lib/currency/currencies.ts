/**
 * Currencies supported in the MVP. Chosen for common Nigerian import routes
 * (China, US, UK/EU, UAE, India, Turkey). Add more here when needed.
 */
export const SUPPORTED_CURRENCIES = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "AED", name: "UAE Dirham", symbol: "AED " },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]["code"];

/** All totals in LANDED AI are reported in Naira. */
export const BASE_CURRENCY: CurrencyCode = "NGN";

export function isCurrencyCode(value: string): value is CurrencyCode {
  return SUPPORTED_CURRENCIES.some((c) => c.code === value);
}
