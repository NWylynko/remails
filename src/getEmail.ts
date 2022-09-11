import { Details, SubjectDetails } from "./components/context/Details"
import { getTemplate } from "./getTemplate";
import { render } from "./render";

type EmailDetails = SubjectDetails & {
  template: string;
}

export type Email = Details & {
  html: string,
  subject: string
}

export const getEmail = async ({ template, to, from }: EmailDetails): Promise<Email> => {
  const email = await getTemplate(template)

  const subject = email.subject({ to, from })
  const html = render(email.Component, { to, from, subject })

  return {
    html,
    subject,
    to,
    from
  }
}