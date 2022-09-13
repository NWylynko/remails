import AWS from 'aws-sdk';

import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

type AWS_SESConfig = ProviderConfig & {
  region: string;
}

export const AWS_SES: Provider<AWS_SESConfig> = (options) => async () => {

  const name = `AWS_SES`

  AWS.config.update({ region: options.region });

  const client = new AWS.SES({ apiVersion: '2010-12-01' })

  const send = async (email: Email): Promise<Email> => {

    const response = await client.sendEmail({
      Destination: {
        ToAddresses: [
          email.to,
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: email.html
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: email.subject
        }
      },
      Source: email.from,
    }).promise()

    return email;

  }

  return {
    name,
    send
  }

}
