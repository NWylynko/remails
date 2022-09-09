
import { getTemplates, Templates, Template } from "./getTemplates"

let templates: Templates;

export const getTemplate = async (name: string): Promise<Template> => {
  if (templates) {
    const template = templates[name];
    if (!template) {
      throw new Error(`The template '${name}' does not exist`)
    }
    return template
  } else {
    templates = await getTemplates();
    return getTemplate(name);
  }
}