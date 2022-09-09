import React from "react";
import { Details, useDetails } from "../../components/context/Details";

export const subject = ({}: Details) => `Bruh what is your email`;

const BruhEmail = () => {
  const { to } = useDetails();
  return (
    <div>
      <h2>To: {to}</h2>
      <span>Bruh wtf is up with your email</span>
    </div>
  );
};

export default BruhEmail;
