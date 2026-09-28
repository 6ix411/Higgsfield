import "server-only";
import type { TariffLookupRequest, TariffLookupResult, TariffProvider } from "./types";

export type * from "./types";

/**
 * The default provider for the MVP: we have no authoritative tariff source
 * connected, so it always answers "requires verification" and never returns
 * rates. This is deliberate — see the compliance rule in ./types.ts.
 */
class UnverifiedTariffProvider implements TariffProvider {
  readonly name = "none";

  async lookup(request: TariffLookupRequest): Promise<TariffLookupResult> {
    return {
      status: "requires_verification",
      hsCode: request.hsCode,
      rates: {},
      notes: [],
      message:
        "Customs duties, levies and VAT are not included automatically. Confirm the correct " +
        "HS code and rates with the Nigeria Customs Service or a licensed customs agent, " +
        "then add them as costs marked 'requires verification'.",
    };
  }
}

export function getTariffProvider(): TariffProvider {
  switch (process.env.TARIFF_PROVIDER) {
    // case "ncs-official": return new NcsOfficialTariffProvider();  // future integration
    default:
      return new UnverifiedTariffProvider();
  }
}
