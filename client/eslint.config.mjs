import { FlatCompat } from "@eslint/eslintrc";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParserPlugin from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      typescript: typescriptPlugin,
      typescriptParser: typescriptParserPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      complexity: ["error", 2],

      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: [
            ["builtin", "external"],
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern:
                "{@components,@features,@utils,@constants,@hooks,@styles,@public,@api,@actions,@store,@context}{,/**}",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          warnOnUnassignedImports: true,
        },
      ],
    },
  },

  {
    name: "complexity/components",
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      complexity: ["error", 5],
    },
  },
];

export default eslintConfig;
