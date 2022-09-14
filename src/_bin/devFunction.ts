import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { getTemplateFiles } from "../getTemplates";
import { startServer } from "../dev/server";

export const devFunction = async () => {
  console.log(`starting dev server`);

  process.env['NODE_ENV'] = 'development';

  // run typescript here to pipe type errors out to the devs terminal
  spawn(`./node_modules/.bin/tsc --allowJs --noEmit --watch`, { shell: true, stdio: "inherit" })

  // start typescript in watch mode here to actually compile to js
  const tsc = spawn(`./node_modules/.bin/tsc --allowJs --outDir ./.remails --watch`, { shell: true })

  const stopServer = await startServer({ tsc })

};
