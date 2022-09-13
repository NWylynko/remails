
import { getTemplates, Template } from "./getTemplates"

let templates: Map<string, Template>;

export const getTemplate = async (name: string): Promise<Template> => {
  if (templates) {

    const template = templates.get(name)

    if (!template) {
      throw new Error(`The template '${name}' does not exist`)
    }

    return template

  } else {

    templates = await getTemplates();

    // called recursively :)
    return getTemplate(name);

  }
}