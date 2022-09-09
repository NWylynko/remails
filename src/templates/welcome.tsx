import React from "react";
import { Details } from "../components/context/Details";

export const subject = ({}: Details) => `Welcome to our app`;

const WelcomeEmail = () => {
  return (
    <div>
      <h1>Welcome to our app</h1>
      <span>We are so excited to have you join us</span>
    </div>
  );
};

export default WelcomeEmail;
