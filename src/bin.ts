#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

import { parseArgs } from "node:util";

import { buildFunction } from "./_bin/buildFunction";
import { devFunction } from "./_bin/devFunction";
import { startFunction } from "./_bin/startFunction";

const { values } = parseArgs({
  options: {
    build: {
      type: 'boolean'
    },
    dev: {
      type: 'boolean'
    },
    start: {
      type: 'boolean'
    }
  }
})

const main = async () => {
  if (values.build) {
    await buildFunction();
  } else if (values.dev) {
    await devFunction();
  } else if (values.start) {
    await startFunction();
  } else {
    throw new Error(`you need to either pick --build, --dev, or --start`)
  }
}

main()

