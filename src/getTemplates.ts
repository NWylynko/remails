import fs from "node:fs/promises";
import path from "node:path"
import type { Details } from "./components/context/Details";

interface Module {
  default: () => JSX.Element;
  subject: (details: Details) => string;
}

export interface Template {
  Component: () => JSX.Element;
  subject: (details: Details) => string;
}

export type Templates = {
  [name: string]: Template
}

export const getTemplates = async () => {
  const templatesDir = path.join(__dirname, "./templates");

  const allFiles = await treeDir(templatesDir)

  // console.log({ allFiles })

  // we only want files that end in .js
  const templateFiles = allFiles.filter((fileName) => {
    const parts = fileName.split(".")
    // console.log({ parts })
    const extension = parts[parts.length - 1];
    return extension === "js"
  })

  // console.log({ templateFiles })

  const templates: Templates = {}

  for await (const filePath of templateFiles) {

    // console.log({ filePath })

    const module: Module = await import(filePath);

    const { default: Component, subject } = module

    const name = filePath
      .replace(templatesDir, "")
      .replace('/', "")
      .replace('.js', "")

    templates[name] = { Component, subject }
  }

  return templates
}

const treeDir = async (dir: string): Promise<string[]> => {
  const filePaths = await fs.readdir(dir)

  let files: string[] = []

  for await (const filePath of filePaths) {

    const fullFilePath = path.join(dir, filePath)

    const stat = await fs.stat(fullFilePath)
    const isDirectory = stat.isDirectory()

    if (isDirectory) {

      // some beautiful recursion
      const deeperFiles = await treeDir(fullFilePath)

      files = [...files, ...deeperFiles]

    } else {

      files.push(fullFilePath)

    }

  }

  return files

}
