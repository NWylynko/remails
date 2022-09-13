import type Options from "mailgun.js/interfaces/Options"

import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

type MailGunConfig = ProviderConfig & Options & {
  domain: string;
}

export const MailGun: Provider<MailGunConfig> = (options) => async () => {

  const name = `MailGun`

  const { default: MG } = await import(`mailgun.js`)
  const { default: formData } = await import(`form-data`)

  const mailgun = new MG(formData)

  const mg = mailgun.client(options);

  const send = async (email: Email): Promise<Email> => {

    const response = await mg.messages.create(options.domain, {
      to: email.to,
      from: email.from,
      subject: email.subject,
      html: email.html
    })

    return email;

  }

  return {
    name,
    send
  }

}
