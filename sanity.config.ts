import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/schemas";
import { defaultDocumentNode } from "@/utilities/structure";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import { colorList } from "@/utilities/style";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

export default defineConfig({
  basePath: "/studio",
  name: "CesarBrandon_Studio",
  title: "Cesar Brandon Studio",

  projectId,
  dataset,

  plugins: [
    deskTool({ defaultDocumentNode }),
    visionTool(),
    simplerColorInput({
      defaultColorFormat: "hex",
      defaultColorList: colorList,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
