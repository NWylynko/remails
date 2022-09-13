import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

interface TestProviderConfig extends ProviderConfig {
  outcome: "fail" | "succeed";
}

export const TestProvider: Provider<TestProviderConfig> = ({ outcome }) => async () => {

  const name = `Test Provider`

  const send = async (email: Email): Promise<Email> => {

    if (outcome === "succeed") {

      console.log(`successfully sent email to ${email.to}`)

      return email;

    } else {

      throw new Error(`failed to send email to: ${email.to}`)

    }

  }

  return {
    name,
    send
  }

}
