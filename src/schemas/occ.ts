import { defineField, defineType } from "sanity";

export default defineType({
  name: "occ",
  title: "OCC",
  type: "document",
  fields: [
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "reference", to: { type: "topic" } }],
    }),
    defineField({
      type: "code",
      name: "myCodeField",
      title: "My code field",
    }),
    defineField({
      name: "component",
      title: "Component",
      type: "string",
    }),
  ],
});
