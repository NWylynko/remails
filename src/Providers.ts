import type { Email } from "./getEmail";
import type { ProviderFunctions } from "./providers/types";

type ProvidersFunctions = Omit<ProviderFunctions, "name">

export const EmailProviders = (providers: ProviderFunctions[]): ProvidersFunctions => {
  const send = async (email: Email): Promise<Email> => {

    let attempt = 1

    for await (const provider of providers) {
      try {
        await provider.send(email);
        if (attempt > 1) {
          console.log(`successfully sent email with provider: ${provider.name}`)
        }
        break;
      } catch (error) {
        console.error(`failed to send with provider: ${provider.name}`)
        console.error(error);
        attempt = attempt + 1;
        continue;
      }
    }

    return email
  }

  return {
    send
  }
}