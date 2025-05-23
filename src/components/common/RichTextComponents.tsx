import urlFor from "@/lib/urlFor";
import Link from "next/link";
import ImagePreview from "./image-preview";

const RichTextComponents = {
  types: {
    image: ({ value }: any) => <ImagePreview src={urlFor(value).url()} />,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-5xl py-10 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl py-10 font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl py-10 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl py-10 font-bold">{children}</h4>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic">
        {children}
      </blockquote>
    ),
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = (value?.href || "").startsWith("/")
        ? "noreferrer noopener"
        : "";

      return (
        <Link
          href={value?.href || ""}
          target="_blank"
          rel={rel}
          className="underline decoration-[#333] hover:decoration-black"
        >
          {children}
        </Link>
      );
    },
  },
};

export default RichTextComponents;
