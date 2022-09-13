import fs from "node:fs/promises";
import path from "node:path"
import type { FetchDetails, SubjectDetails } from "./components/context/Details";

type EmptyFunction = () => Promise<void>

// allows the fetch function type to be passed through, if its not we assume they haven't defined a fetch function and default to void
export type Subject <FetchFunction extends Fetch<any> = EmptyFunction, > = (details: SubjectDetails, props: { data: Awaited<ReturnType<FetchFunction>> } ) => string

// fetch will either resolve to some real data or to void
export type Fetch <Data, > = (EmptyFunction) | ((details: FetchDetails) => Promise<Data>)

export type EmailTemplateProps <Data, > = { data: Data }

// pretty similar to subject but returns a jsx component instead of a string
export type EmailTemplate <FetchFunction extends Fetch<any> = EmptyFunction, > = (props: EmailTemplateProps<Awaited<ReturnType<FetchFunction>>>) => JSX.Element;

type Shared = {
  subject: Subject<any>;
  fetch?: Fetch<any>;
}

type Module = Shared & {
  default: EmailTemplate<any>;
}

export type Template = Shared & {
  Component: EmailTemplate<any>;
}

export type Templates = {
  [name: string]: Template
}

export const getTemplates = async () => {
  const templatesDir = path.join(process.cwd(), "./templates");

  // console.log({ templatesDir })

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

    const { default: Component, subject, fetch } = module

    const name = filePath
      .replace(templatesDir, "")
      .replace('/', "")
      .replace('.js', "")

    templates[name] = { Component, subject, fetch }
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
