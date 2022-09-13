import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

export const buildFunction = async () => {
  console.log(`building...`);

  spawn(`./node_modules/.bin/tsc --outDir ./.remails`, { shell: true, stdio: "inherit" })

};
