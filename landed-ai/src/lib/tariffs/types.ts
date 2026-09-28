/**
 * COMPLIANCE RULE: LANDED AI never invents Nigerian customs duty rates,
 * taxes, HS codes, restrictions, permits or regulatory requirements.
 *
 * Any customs figure is either:
 *  - "verified": returned by an authoritative data source, with a citation; or
 *  - "requires_verification": everything else, including numbers the user
 *    typed in themselves. The UI must label these clearly.
 */
export type TariffVerificationStatus = "verified" | "requires_verification";

export interface TariffSourceCitation {
  /** e.g. "Nigeria Customs Service — Common External Tariff" */
  name: string;
  url?: string;
  /** Date the source data was retrieved or published (ISO 8601). */
  retrievedAt: string;
}

export interface TariffLookupRequest {
  productDescription: string;
  /** Only if the user already knows it. We never guess an HS code. */
  hsCode?: string;
  originCountry?: string;
}

export interface TariffLookupResult {
  status: TariffVerificationStatus;
  hsCode?: string;
  /** Percentage rates, e.g. { importDuty: 20 }. Empty when nothing is verified. */
  rates: Record<string, number>;
  /** Restrictions, permits, etc. — only from the source, never generated. */
  notes: string[];
  source?: TariffSourceCitation;
  /** Plain-English message for the user. */
  message: string;
}

/**
 * Any official tariff data source must implement this interface.
 * Register new implementations in ./index.ts.
 */
export interface TariffProvider {
  readonly name: string;
  lookup(request: TariffLookupRequest): Promise<TariffLookupResult>;
}
