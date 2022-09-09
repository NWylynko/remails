import sgMail from '@sendgrid/mail';
import { Email } from '../getEmail';

const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  throw new Error(`the environment variable SENDGRID_API_KEY needs to be set`)
}

sgMail.setApiKey(apiKey);

export const send = async (email: Email): Promise<Email> => {

  const [ response ] = await sgMail.send(email);

  // check for failure
  const status = response.statusCode.toString().split("")[0]
  if (status === "4" || status === "5") {
    throw new Error(`Sending failed with status code ${response.statusCode}`)
  }

  return email;

}