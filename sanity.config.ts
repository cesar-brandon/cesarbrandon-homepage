import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { defaultDocumentNode } from "./utilities/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

export default defineConfig({
  basePath: "/studio",
  name: "CesarBrandon_Studio",
  title: "Cesar Brandon Studio",

  projectId,
  dataset,

  plugins: [deskTool({ defaultDocumentNode }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
