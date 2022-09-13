import type { Email } from "./getEmail";
import type { ProviderFunctions } from "./providers/types";

type ProvidersFunctions = Omit<ProviderFunctions, "name">

export const EmailProviders = async (_providers: (() => Promise<ProviderFunctions>)[]): Promise<ProvidersFunctions> => {

  let providers: ProviderFunctions[] = [];

  for await (const providerFn of _providers) {
    try {

      // this imports and sets up the provider
      const provider = await providerFn();

      providers.push(provider)

    } catch (error) {
      const errorString = String(error);
      if (errorString.startsWith(`Error: Cannot find module`)) {
        // we need to tell the dev to install the package
        const errorLines = errorString.split('\n')
        const errorMessage = errorLines[0];
        const errorStrings = errorMessage.split(' ');
        const packageName = errorStrings[4];

        console.error(`\n\nyou need to install ${packageName}`);
        console.error(`install it with your package manager: \n`)
        console.error(`yarn add ${packageName}`)
        console.error(`npm install ${packageName}`)
        console.error(`pnpm add ${packageName}`)
        console.error(`bun add ${packageName}\n\n`)

      }

      throw error
    }
  }

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