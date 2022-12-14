import { FastifyReply, FastifyRequest } from "fastify";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getTemplateFiles } from "../getTemplates";

interface AppProps {
  templates: string[];
}

const App = ({ templates }: AppProps) => {
  return (
    <>
      <html>
        <head>
          <title>Remails Dev</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300&display=swap" rel="stylesheet" />
          <script src="/websocketclient.js" type="module" />
        </head>
        <body style={{ fontFamily: "'Noto Sans', sans-serif" }}>
          <h1>Hello World</h1>
          <ul id="templates-list">
            {templates.map((name) => (
              <li key={name}>
                <a style={{ color: "black" }} href={`/template/${name}`}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </body>
      </html>
    </>
  );
};

export const homePageHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const templateFiles = await getTemplateFiles(".remails/templates");
  const templates = templateFiles.map(({ name }) => name);

  res.header("Content-Type", "text/html");
  return renderToStaticMarkup(<App templates={templates} />);
};
