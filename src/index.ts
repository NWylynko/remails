import "dotenv/config";
import "source-map-support/register";

export { getEmail as renderEmail } from './getEmail';

export { EmailProviders } from "./Providers";
export { SendGrid } from "./providers/sendgrid";
export { NodeMailer } from "./providers/nodemailer"
export { TestProvider } from "./providers/testProvider";
export { MailGun } from "./providers/Mailgun";
export { Postmark } from "./providers/postmark";
export { AWS_SES } from "./providers/aws-ses";

export { useDetails } from "./components/context/Details"
export type { Details, SubjectDetails, FetchDetails } from "./components/context/Details"
export { Subject, Fetch, EmailTemplate } from "./getTemplates";