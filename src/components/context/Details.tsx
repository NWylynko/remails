import React, { useContext, createContext, PropsWithChildren } from "react";
import { EmailTemplateProps } from "../../getTemplates";

export type Details = {
  to: string;
  from: string;
  subject: string;
};

// when passing details to the subject, it can't know what the subject is yet lol
export type SubjectDetails = Omit<Details, "subject">;
export type FetchDetails = Omit<SubjectDetails, "data">;

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
