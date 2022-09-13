import fs from "node:fs/promises";
import path from "node:path";
import type { FetchDetails, SubjectDetails } from "./components/context/Details";

type EmptyFunction = () => Promise<void>;

// allows the fetch function type to be passed through, if its not we assume they haven't defined a fetch function and default to void
export type Subject<FetchFunction extends Fetch<any> = EmptyFunction> = (
  details: SubjectDetails,
  props: { data: Awaited<ReturnType<FetchFunction>> }
) => string;

// fetch will either resolve to some real data or to void
export type Fetch<Data> = EmptyFunction | ((details: FetchDetails) => Promise<Data>);

export type EmailTemplateProps<Data> = { data: Data };

// pretty similar to subject but returns a jsx component instead of a string
export type EmailTemplate<FetchFunction extends Fetch<any> = EmptyFunction> = (
  props: EmailTemplateProps<Awaited<ReturnType<FetchFunction>>>
) => JSX.Element;

type Shared = {
  subject: Subject<any>;
  fetch?: Fetch<any>;
};

type Module = Shared & {
  default: EmailTemplate<any>;
  devFetch?: Fetch<any>;
};

export type Template = Shared & {
  Component: EmailTemplate<any>;
};

export const getTemplates = async () => {

  const templateFiles = await getTemplateFiles("./templates")

  const templates = new Map<string, Template>();

  for await (const { name, filePath } of templateFiles) {
    const module: Module = await import(filePath);

    const { default: Component, subject } = module;

    const inDev = process.env.NODE_ENV === "development";

    // if in dev mode, we want to use the dev fetch if it exists
    // if its undefined then fallback to using the real fetch
    // when in prod we just want to use the real fetch
    const fetch = inDev ? (module.devFetch !== undefined ? module.devFetch : module.fetch) : module.fetch;

    templates.set(name, { Component, subject, fetch });
  }

  return templates;
};

export const getTemplateFiles = async (templatePath: string = "./templates") => {
  const templatesDir = path.join(process.cwd(), templatePath);
  const allFiles = await treeDir(templatesDir);

  // we only want files that end in .js
  const templateFiles = allFiles
    .filter((fileName) => {
      const parts = fileName.split(".");
      // console.log({ parts })
      const extension = parts[parts.length - 1];
      return extension === "js";
    })
    .map((filePath) => {
      const name = filePath.replace(templatesDir, "").replace("/", "").replace(".js", "");
      return {
        name,
        filePath,
      };
    });

  return templateFiles;
}

const treeDir = async (dir: string): Promise<string[]> => {
  const filePaths = await fs.readdir(dir);

  let files: string[] = [];

  for await (const filePath of filePaths) {
    const fullFilePath = path.join(dir, filePath);

    const stat = await fs.stat(fullFilePath);
    const isDirectory = stat.isDirectory();

    if (isDirectory) {
      // some beautiful recursion
      const deeperFiles = await treeDir(fullFilePath);

      files = [...files, ...deeperFiles];
    } else {
      files.push(fullFilePath);
    }
  }

  return files;
};
