import "source-map-support/register";
import "dotenv/config";

import { getEmail } from './getEmail';

import { send } from "./providers/sendgrid"

const to = "nick@wylynko.com"
const from = "nick1014375@gmail.com"
const template = "bruh/bruhEmail"

const main = async () => {

  const email = await getEmail({ template, to, from })

  await send(email)

  console.log(email)
}

main()