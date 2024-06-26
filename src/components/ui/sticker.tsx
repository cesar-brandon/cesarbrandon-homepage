import { cn } from "@/lib/utils";

interface StickerProps {
  className?: string;
  type?: "default" | "asterisk";
  variant?: "default";
}

const primaryColor = "#FF863C";

export default function Sticker({ className, type }: StickerProps) {
  if (type === "asterisk") {
    return <Asterisk className={className} />;
  }

  return (
    <div
      className={cn(
        "absolute -right-8 top-8 bg-orange-500 h-4 md:h-6 xl:h-10 w-10 md:w-20 z-10",
        className,
      )}
    />
  );
}

export function Asterisk({ className, variant = "default" }: StickerProps) {
  return (
    <svg
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_104_26)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M107.143 0H92.8571V82.7556L34.3401 24.2385L24.2386 34.3401L82.7556 92.8571H0V107.143H82.7555L24.2386 165.66L34.3401 175.761L92.8571 117.244V200H107.143V117.244L165.66 175.761L175.761 165.66L117.244 107.143H200V92.8571H117.244L175.761 34.34L165.66 24.2385L107.143 82.7555V0Z"
          fill="url(#paint0_linear_104_26)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_104_26"
          x1="20.5"
          y1="16"
          x2="100"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          {variant === "default" && (
            <>
              <stop stopColor={primaryColor} />
              <stop offset="1" stopColor={primaryColor} />
            </>
          )}
        </linearGradient>
        <clipPath id="clip0_104_26">
          <rect width="200" height="200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
