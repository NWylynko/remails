import MG from 'mailgun.js';
import type Options from "mailgun.js/interfaces/Options"
import formData from "form-data"

import type { Email } from '../getEmail';
import type { Provider, ProviderConfig } from './types';

type MailGunConfig = ProviderConfig & Options & {
  domain: string;
}

export const MailGun: Provider<MailGunConfig> = (options) => async () => {

  const name = `MailGun`

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
