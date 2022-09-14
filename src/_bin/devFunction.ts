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

  // // additionally we listen for when its ready to run
  // tsc.stdout.on("data", async (_message) => {

  //   const message = _message.toString()

  //   // when this is printed to terminal it means its done compiling
  //   if (message.includes(`Watching for file changes.`)) {

  //     // we need a list of the templates
  //     const templateFiles = await getTemplateFiles(".remails/templates")
  //     const templates = templateFiles.map(({ name }) => name);

  //     // send this on websocket to tell client the list of templates
  //     console.log({ templates })


  //   }

  // })

  const stopServer = await startServer({ tsc })

};
