import type { createTransport } from 'nodemailer';

import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

type NodeMailerConfig = ProviderConfig & Parameters<typeof createTransport>[0]

export const NodeMailer: Provider<NodeMailerConfig> = (config) => async () => {

  const name = `NodeMailer`

  const { default: nodemailer } = await import(`nodemailer`)

  const transporter = nodemailer.createTransport(config)

  const send = async (email: Email): Promise<Email> => {

    let response = await transporter.sendMail({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
    });

    return email;

  }

  return {
    name,
    send
  }

}
