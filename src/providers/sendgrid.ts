import sgMail from '@sendgrid/mail';
import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

interface SendGridConfig extends ProviderConfig {
  apiKey: string;
}

export const SendGrid: Provider<SendGridConfig> = ({ apiKey }) => {

  const name = `SendGrid`

  sgMail.setApiKey(apiKey);

  const send = async (email: Email): Promise<Email> => {

    const [ response ] = await sgMail.send(email);
  
    // check for failure
    const status = response.statusCode.toString().split("")[0]
    if (status === "4" || status === "5") {
      throw new Error(`Sending failed with status code ${response.statusCode}`)
    }
  
    return email;
  
  }

  return {
    name,
    send
  }

}
