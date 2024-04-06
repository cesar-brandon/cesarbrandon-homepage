import { codeToHtml } from "shiki";

interface Props {
  code: string;
}

export default async function Code({ code }: Props) {
  const html = await codeToHtml(code, {
    lang: "tsx",
    themes: {
      light: "catppuccin-latte",
      dark: "tokyo-night",
    },
  });

  return (
    <div
      className="absolute min-w-full h-full text-sm left-0 top-0"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
