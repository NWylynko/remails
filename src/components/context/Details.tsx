import React, { useContext, createContext, PropsWithChildren } from "react";

export type Details = {
  to: string;
  from: string;
};

const detailsContext = createContext<Details>({
  to: "",
  from: "",
});

type DetailsProviderProps = PropsWithChildren<Details>;

export const DetailsProvider = ({ children, ...props }: DetailsProviderProps) => {
  return <detailsContext.Provider value={props}>{children}</detailsContext.Provider>;
};

export const useDetails = () => useContext(detailsContext);
