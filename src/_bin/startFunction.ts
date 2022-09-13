import "dotenv/config";
import { spawn } from "node:child_process";
import path from "node:path";

export const startFunction = async () => {
  console.log(`starting production Remails server`);

  process.env['NODE_ENV'] = 'production';

  const cwd = path.join(process.cwd(), `./.remails`)

  spawn(`node index.js`, { shell: true, stdio: "inherit", cwd, env: process.env })

};
