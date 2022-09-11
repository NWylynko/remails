import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

export const Fail: Provider<ProviderConfig> = () => {

  const name = `Fail`

  const send = async (email: Email): Promise<Email> => {

    throw new Error(`failed to send email to: ${email.to}`)

    return email;
  
  }

  return {
    name,
    send
  }

}
