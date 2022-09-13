import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

interface SendGridConfig extends ProviderConfig {
  apiKey: string;
}

export const SendGrid: Provider<SendGridConfig> = ({ apiKey }) => async () => {

  const name = `SendGrid`

  // attempt to import the package
  const { default: sgMail } = await import('@sendgrid/mail')

  sgMail.setApiKey(apiKey);

  const send = async (email: Email): Promise<Email> => {

    const [response] = await sgMail.send({
      to: email.to,
      from: email.from,
      html: email.html,
      subject: email.subject
    });

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
