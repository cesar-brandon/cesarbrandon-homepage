import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "github",
      title: "GitHub",
      type: "url",
    }),
    defineField({
      name: "demo",
      title: "Demo",
      type: "url",
    }),
    defineField({
      name: "playStore",
      title: "Play Store",
      type: "url",
    }),
    defineField({
      name: "appStore",
      title: "App Store",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "reference", to: { type: "topic" } }],
    }),
    defineField({
      name: "ownership",
      title: "Ownership",
      type: "string",
      description: "Own product vs client or collaboration work.",
      options: {
        list: [
          { title: "Own — developed by you", value: "own" },
          { title: "Freelance / collaboration", value: "freelance" },
        ],
        layout: "radio",
      },
      initialValue: "own",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Web", value: "web" },
          { title: "Mobile", value: "mobile" },
        ],
        layout: "radio",
      },
      initialValue: "web",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      ownership: "ownership",
      platform: "platform",
    },
    prepare(selection) {
      const { author, ownership, platform } = selection;
      const meta = [ownership, platform].filter(Boolean).join(" · ");
      const byline = author ? `by ${author}` : "";
      const subtitle = [meta, byline].filter(Boolean).join(" — ");
      return { ...selection, subtitle };
    },
  },
});
