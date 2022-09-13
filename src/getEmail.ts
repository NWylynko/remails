import { Details, FetchDetails } from "./components/context/Details"
import { getTemplate } from "./getTemplate";
import { render } from "./render";

type EmailDetails = FetchDetails & {
  template: string;
}

export type Email = Details & {
  html: string,
  subject: string
}

export const getEmail = async ({ template, to, from }: EmailDetails): Promise<Email> => {
  const email = await getTemplate(template)

  const data = email.fetch && await email.fetch({ to, from })
  const subject = email.subject({ to, from }, { data })
  const html = render(email.Component, { to, from, subject }, { data })

  return {
    html,
    subject,
    to,
    from
  }
}