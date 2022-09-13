import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import "dotenv/config"

export const startFunction = async () => {
  console.log(`starting production Remails server`);

  process.env['NODE_ENV'] = 'production';

  const cwd = path.join(process.cwd(), `./.remails`)

  spawn(`node index.js`, { shell: true, stdio: "inherit", cwd, env: process.env })

};
