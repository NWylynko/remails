import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

export const Success: Provider<ProviderConfig> = () => {

  const name = `Success`

  const send = async (email: Email): Promise<Email> => {

    console.log(`successfully sent email to ${email.to}`)

    return email;
  
  }

  return {
    name,
    send
  }

}
