import "dotenv/config";
import "source-map-support/register";

export { getEmail as renderEmail } from './getEmail';

export { EmailProviders } from "./Providers";
export { SendGrid } from "./providers/sendgrid";
export { Success } from "./providers/successful";
export { Fail } from "./providers/fail";

export { useDetails } from "./components/context/Details"
export type { Details } from "./components/context/Details"
export { Subject } from "./getTemplates";