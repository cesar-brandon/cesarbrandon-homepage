import { codeToHtml } from "shiki";

interface Props {
  code: string;
}

export default async function Code({ code }: Props) {
  const html = await codeToHtml(code, {
    lang: "tsx",
    theme: "tokyo-night",
  });

  return (
    <div
      className="absolute text-sm left-0 top-0"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
