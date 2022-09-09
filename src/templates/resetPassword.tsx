import React from "react";
import { Details, useDetails } from "../components/context/Details";

export const subject = ({}: Details) => `Reset your account password`;

const ResetPassword = () => {
  const { to } = useDetails();
  return (
    <div>
      <h2>Reset your password</h2>
      <span>Someone requested for your accounts password to be reset</span>
      <span>If that is you then please click this link to continue</span>
      <span>Your Email is {to}</span>
    </div>
  );
};

export default ResetPassword;
