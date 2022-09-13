import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DetailsProvider, Details } from "./components/context/Details";

type Options = Details;

export const render = (Component: () => JSX.Element, options: Options) => {
  const App = (
    <>
      <DetailsProvider {...options}>
        <Component />
      </DetailsProvider>
    </>
  );

  return renderToStaticMarkup(App);
};
