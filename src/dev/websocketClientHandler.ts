import { readFile } from "node:fs/promises";
import path from "node:path";
import { FastifyRequest, FastifyReply } from "fastify";

let files = new Map<string, string>();

export const websocketClientHandler = (name: string) => async (req: FastifyRequest, res: FastifyReply) => {

  res.header("Content-Type", "application/javascript")

  if (files.has(name)) {
    return files.get(name);
  }

  const filePath = path.join(__dirname, name);

  const file = await readFile(filePath, "utf-8");

  files.set(name, file)

  return file;
};
