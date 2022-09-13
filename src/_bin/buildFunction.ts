import { spawn } from "node:child_process";

export const buildFunction = async () => {
  console.log(`building...`);

  spawn(`./node_modules/.bin/tsc --allowJs --outDir ./.remails`, { shell: true, stdio: "inherit" })

};
