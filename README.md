# Remails

`React Emails`

A Next.js inspired react framework for sending emails. Made to greatly simplify sending Emails and building email templates using React. This framework leaves itself very open to run however you would like to use it, for example you may add an Express or Fastify webserver and listen for requests in a webhook style. Alternatively you could add pubsub consumer and run whenever a new message/event comes in. You could even just implement it in to an existing api and call it directly on things like user sign-up.

## Example

Check out [nwylynko/remails-example](https://github.com/NWylynko/remails-example) for an example project.

## Setup

1. Install Dependencies

```bash
yarn add remails react react-dom
```
```bash
yarn add -D @types/react @types/react-dom
```

2. Add scripts to package.json

```json
"scripts": {
  "dev": "remails --dev",
  "start": "remails --start",
  "build": "remails --build"
},
```

3. Add a template

  - Create a folder called `templates`
  - Add a simple template at `templates/welcome.tsx`

```typescript
import React from "react";
import type { EmailTemplate, Subject } from "remails";

export const subject = () => `Welcome to our amazing app`;

const WelcomeEmail = () => {
  return (
    <div>
      <h1>Welcome to our app</h1>
      <span>We are so excited to have you join us</span>
    </div>
  );
};

export default WelcomeEmail;
```

4. Add ./index.ts file

```typescript
import { EmailProviders, SendGrid, renderEmail } from "remails"
import { apiKey } from "./config"

(async () => {

  const emailProvider = await EmailProviders([
    SendGrid({ apiKey })
  ]);

  // add in the sender and receiver
  const to = "..."
  const from = "..."
  // the template name is based of the file name
  const template = "welcome"

  const email = await renderEmail({ template, to, from })

  await emailProvider.send(email)
})();
```

5. Build and run

```bash
yarn build
```
```bash
yarn start
```

## Functions

Use these in your index.ts or wherever your sending your emails from

### renderEmail

This function takes an object with three items in it, the template you want to use, who your sending the email to and where its being sent from. You may hardcode the from email or depending on the type of email being sent use different from address. Templates are read in from your templates folder, for example if you have a template at `./templates/orderConfirmation.tsx` then the template string be `orderConfirmation`. If you use folders then just put a `/` in the name eg `order/confirmation`.
```typescript
import { renderEmail } from "remails"

const template = `orderConfirmation`

const email = await renderEmail({ template, to, from })
```

### EmailProviders

This little function wraps the provider or providers you choice to use, when you attempt to send an email it will go through and try each one, if the first one fails it will go on to the next and try to use it and so on. Its just a little fail safe to help make sure the email doesn't fail to send.

The returned object contains a function called `send` that you pass your email (returned from renderEmail) in to.

```typescript
import { EmailProviders, SendGrid } from "remails"

// define this once
const { send } = await EmailProviders([
  SendGrid({ apiKey })
]);

// call this many times
await send(email)
```
## Template Options

### Subject Line

The subject function is for setting the subject line of the email. It needs to return a string and gets a couple arguments passed through to it. Most importantly data gets passed in, this is from the fetch function. Great if you want to have the subject be something like `Welcome to the app, ${data.fullname}`. This function is required.
```typescript
import type { Subject } from "remails";

export const subject: Subject<Fetch> = ({ to, from }, { data }) => `...`;
```

### Main Component

This is the entrypoint for the react template, The main thing to keep in mind is you can't use state or effects. But use components, context, images, go ham. This component must be default exported. Like the subject this is required.
```typescript
import type { EmailTemplate } from "remails";

const ResetPassword: EmailTemplate<Fetch> = ({ data }) => {
  return (
    <span>Reset your password</span>
  )
}

export default ResetPassword
```

### Details Context

Your template gets wrapped in a context that contains who your sending the email to, what email its being sent from and the what the subject line evaluates too. This is completely optional to use.
```typescript
import { useDetails } from "remails";

const { to, from, subject } = useDetails();
```

### Data Fetching

here's a smart little function, the best use of the fetch function is to look up your user by the email so you can use there name or shopping order, etc in your email. fetching is completely optional, just use it if your use case needs to fetch some data.
```typescript
import type { FetchDetails } from "remails";

export const fetch = async ({ to, from }: FetchDetails) => {
  const user = await lookupUser({ email: to });

  return user
}

// you will want to get the typeof the fetch function so your other functions can infer the return value from it
type Fetch = typeof fetch;
```

### Dev Data Fetching / Mocking

While in dev mode you won't want to use prod servers, while you can handle this in the fetch function, a separate devFetch function can be defined. This can either just return mock data like in this example or could fetch from a local dev server or database.
```typescript
import type { FetchDetails } from "remails";

export const devFetch = async ({ to, from }: FetchDetails) => {
  return {
    name: "Test User",
  };
};
```

## Providers

### [SendGrid](https://sendgrid.com/)
```bash
yarn add @sendgrid/mail
```
```typescript
import { SendGrid } from "remails"
```

### [NodeMailer](https://nodemailer.com/)
```bash
yarn add nodemailer
```
```typescript
import { NodeMailer } from "remails"
```

### [AWS Simple Email Server](https://aws.amazon.com/ses/)
```bash
yarn add aws-sdk
```
```typescript
import { AWS_SES } from "remails"
```

### [Mailgun](https://www.mailgun.com/)
```bash
yarn add mailgun.js form-data
```
```typescript
import { MailGun } from "remails"
```

### [Postmark](https://postmarkapp.com/)
```bash
yarn add postmark
```
```typescript
import { Postmark } from "remails"
```