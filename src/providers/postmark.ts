import type { ClientOptions } from "postmark/dist/client/models";

import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

type PostmarkConfig = ProviderConfig & {
  serverToken: string;
  configOptions?: ClientOptions.Configuration
}

export const Postmark: Provider<PostmarkConfig> = (options) => async () => {

  const name = `Postmark`

  const { default: postmark } = await import(`postmark`);

  const client = new postmark.ServerClient(options.serverToken, options.configOptions);

  const send = async (email: Email): Promise<Email> => {

    const response = await client.sendEmail({
      "From": email.from,
      "To": email.to,
      "Subject": email.subject,
      "HtmlBody": email.html
    });

    // this should be checked
    // response.ErrorCode

    return email;

  }

  return {
    name,
    send
  }

}
