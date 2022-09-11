import React, { useContext, createContext, PropsWithChildren } from "react";

export type Details = {
  to: string;
  from: string;
  subject: string;
};

// when passing details to the subject, it can't know what the subject is yet lol
export type SubjectDetails = Omit<Details, "subject">

const detailsContext = createContext<Details>({
  to: "",
  from: "",
  subject: "",
});

type DetailsProviderProps = PropsWithChildren<Details>;

export const DetailsProvider = ({ children, ...props }: DetailsProviderProps) => {
  return <detailsContext.Provider value={props}>{children}</detailsContext.Provider>;
};

export const useDetails = () => useContext(detailsContext);
