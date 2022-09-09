import { Details } from "./components/context/Details"
import { getTemplate } from "./getTemplate";
import { render } from "./render";

type EmailDetails = Details & {
  template: string;
}

export type Email = Details & {
  html: string,
  subject: string
}

export const getEmail = async ({ template, to, from }: EmailDetails): Promise<Email> => {
  const email = await getTemplate(template)

  const html = render(email.Component, { to, from })
  const subject = email.subject({ to, from })

  return {
    html,
    subject,
    to,
    from
  }
}