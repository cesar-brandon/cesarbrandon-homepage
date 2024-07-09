import SmoothScrolling from "@/lib/smooth-scroolling";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SmoothScrolling>{children}</SmoothScrolling>;
}
