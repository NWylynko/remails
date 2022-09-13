import { CourierClient } from '@trycourier/courier';

import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

interface CourierConfig extends ProviderConfig {
  baseUrl?: string;
  authorizationToken?: string;
  routing: {
    method: "all" | "single",
    channels: string[]
  }
}

// this one needs testing to ensure it works as expected
// for now I am not going to export it from index, but
// people can still import it directly if they want to test it

export const Courier: Provider<CourierConfig> = ({ baseUrl, authorizationToken, routing }) => {

  const name = `Courier`

  const courier = CourierClient({ baseUrl, authorizationToken });

  const send = async (email: Email): Promise<Email> => {

    // so this doesn't seem to care about the from address
    // I am guessing its something you configure in the website
    // and is controlled by the routing options
    const { requestId } = await courier.send({
      message: {
        to: {
          email: email.to,
        },
        content: {
          title: email.subject,
          body: email.html
        },
        routing
      },
    });

    return email;

  }

  return {
    name,
    send
  }

}
