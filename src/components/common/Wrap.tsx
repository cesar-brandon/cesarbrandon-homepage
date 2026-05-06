"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const SPLASH_MS = 850;

type PageRevealContextValue = {
  revealed: boolean;
  setRevealed: (value: boolean) => void;
};

const PageRevealContext = createContext<PageRevealContextValue | null>(null);

export function usePageReveal() {
  const ctx = useContext(PageRevealContext);
  if (!ctx) {
    throw new Error("usePageReveal must be used within PageRevealProvider");
  }
  return ctx;
}

export function PageRevealProvider({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <PageRevealContext.Provider value={{ revealed, setRevealed }}>
      {children}
    </PageRevealContext.Provider>
  );
}

export function MainWithReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { revealed } = usePageReveal();
  return (
    <main
      className={cn(
        className,
        "transition-opacity duration-500 ease-out",
        !revealed && "pointer-events-none select-none opacity-0",
      )}
    >
      {children}
    </main>
  );
}

const Wrap: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { setRevealed } = usePageReveal();
  const router = useRouter();
  const pathname = usePathname();
  const splashDoneRef = useRef(false);

  useEffect(() => {
    const finishSplash = () => {
      setIsExpanded(false);
      setRevealed(true);
      splashDoneRef.current = true;
    };

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      finishSplash();
      return;
    }

    const t = window.setTimeout(finishSplash, SPLASH_MS);
    return () => window.clearTimeout(t);
  }, [setRevealed]);

  useEffect(() => {
    if (pathname === "/about" && splashDoneRef.current) {
      setIsExpanded(false);
    }
  }, [pathname]);

  const handleCircleClick = () => {
    if (!splashDoneRef.current) return;
    if (pathname !== "/about") {
      setIsExpanded(true);

      setTimeout(() => {
        router.push("/about");
      }, 500);
    }
  };

  return (
    <div onClick={handleCircleClick}>
      <div
        id="animated-circle"
        className={cn(
          "absolute left-1/2 -ml-[36px] top-[28px] w-[72px] h-[72px] rounded-full bg-foreground dark:bg-background z-20 transition-all ease-in-out duration-700",
          isExpanded
            ? "transform scale-[80] z-50 dark:bg-background/30 dark:backdrop-blur"
            : "",
        )}
      ></div>
      <div className="group h-[72px] w-[72px] overflow-hidden rounded-full dark:border-2 dark:border-white dark:border-opacity-30  absolute left-1/2 ml-[-36px] top-[28px] z-20">
        <Image
          className="cursor-pointer mt-6 group-hover:mt-2 group-hover:animate-none transition-all duration-300"
          src="/icon-dark.png"
          alt="link-home"
          width={1196}
          height={1199}
          priority
        />
      </div>
    </div>
  );
};

export default Wrap;
