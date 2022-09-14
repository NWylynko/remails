import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DetailsProvider, Details } from "../components/context/Details";
import type { EmailTemplate, EmailTemplateProps } from "../getTemplates";

export const render = (Component: EmailTemplate, details: Details, props: EmailTemplateProps<any>) => {
  const App = (
    <>
      <DetailsProvider {...details}>
        <Component {...props} />
      </DetailsProvider>
    </>
  );

  return renderToStaticMarkup(App);
};
