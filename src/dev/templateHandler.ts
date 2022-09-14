import { FastifyReply, FastifyRequest } from "fastify";
import { getTemplates } from "../getTemplates";

import { render } from "./renderTemplate";
import html from "nanohtml";
import raw from "nanohtml/raw";

export const templateHandler = async (req: FastifyRequest, res: FastifyReply) => {

  const templateName = (req.params as any)["*"] as string;

  // can't use this as it caches the template
  // const template = await getTemplate(templateName, "./.remails/templates");

  const templates = await getTemplates("./.remails/templates")
  const template = templates.get(templateName)

  if (!template) {
    throw new Error(`that template doesn't exist`)
  }

  const to = "to-test@email.com"
  const from = "from-test@email.com"

  const data = template.fetch && await template.fetch({ to, from })
  const subject = template.subject({ to, from }, { data })
  const html = render(template.Component, { to, from, subject }, { data })

  res.header("Content-Type", "text/html");
  return htmlContainer(html)
};

const htmlContainer = (body: string) =>
  html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <script src="/websocketclientTemplate.js" type="module"></script>
        <style>
          table,
          td,
          div,
          h1, h2, h3, h4, h5, h6
          p {
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body style="margin:0;padding:0;">
        ${raw(body)}
      </body>
    </html>
  `.toString();