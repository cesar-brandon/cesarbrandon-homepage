// interface OCC extends Base {
//   mainImage: Image;
//   title: string;
//   description: string;
//   topics: string[];
//   code: CodeBlock[];
//   component: JSX.Element;
// }
interface OCC {
  _id: string;
  mainImage: string;
  title: string;
  slug: Slug;
  description: string;
  topics: string[];
  code: CodeBlock;
  component: JSX.Element;
}

interface CodeBlock {
  code: string;
  language: string;
}
