import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DetailsProvider, Details } from "./components/context/Details";
import html from "nanohtml";
import raw from "nanohtml/raw";
import type { EmailTemplate, EmailTemplateProps } from "./getTemplates";

export const render = (Component: EmailTemplate, details: Details, props: EmailTemplateProps<any>) => {
  const App = (
    <>
      <DetailsProvider {...details}>
        <Component {...props} />
      </DetailsProvider>
    </>
  );

  const html = renderToStaticMarkup(App);

  return htmlContainer(html);
};

const htmlContainer = (body: string) =>
  html`
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        <title></title>
        <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
        <![endif]-->
        <style>
          table,
          td,
          div,
          h1,
          p {
            font-family: Arial, sans-serif;
          }
          table,
          td {
            border: 2px solid #000000 !important;
          }
        </style>
      </head>
      <body style="margin:0;padding:0;">
        ${raw(body)}
      </body>
    </html>
  `.toString();
