import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

export const devFunction = async () => {
  console.log(`starting dev server`);

  process.env['NODE_ENV'] = 'development';

};
