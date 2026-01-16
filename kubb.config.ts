import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const nameTransformer = (name: string) => {
  if (name.includes("Controller")) name = name.replace("Controller", "");  
  if (name.includes("FindByID")) name = `find${capitalize(name.replace("FindByID", "ByID"))}`;
  if (name.includes("FindMany")) name = `find${capitalize(name.replace("FindMany", ""))}`;
  if (name.includes("Create")) name = `create${capitalize(name.replace("Create", ""))}`;
  if (name.includes("Update")) name = `update${capitalize(name.replace("Update", ""))}`;
  if (name.includes("Delete")) name = `delete${capitalize(name.replace("Delete", ""))}`;

  return name;
}

export default defineConfig(() => {
  return {
    root: '.',
    input: {
      path: './swagger.yaml',
    },
    output: {
      clean: true,
      path: './src/gen',
    },
    plugins: [
      pluginOas({ validate: true, contentType: "application/json" }),
      pluginTs({ transformers: { name: nameTransformer } }),
    ],
  }
})