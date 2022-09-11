import type { Email } from "../getEmail";

export interface ProviderConfig {
  
}

export type ProviderFunctions = {
  name: string;
  send: (email: Email) => Promise<Email>;
}

export type Provider<Config extends ProviderConfig, > = (config: Config) => ProviderFunctions