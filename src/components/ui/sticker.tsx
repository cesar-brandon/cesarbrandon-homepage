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
        className
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

export function LogoSticker({ className, variant = "default" }: StickerProps) {
  return (
    <svg
      width="95"
      height="116"
      viewBox="0 0 95 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_d_1044_166)">
        <path
          d="M12.2568 42.6868C5.05678 39.8868 5.25678 20.8535 6.25678 11.6868C13.4567 3.2867 24.9235 9.52023 29.7568 13.687C35.3568 0.487012 49.7568 2.1869 56.2568 4.68684C58.2568 -0.113163 65.4235 -0.313162 68.7568 0.186838C77.1568 9.38684 78.5902 28.6868 78.2568 37.1868C87.8568 53.1868 90.5902 70.5202 90.7568 77.1868C91.7568 86.6868 85.2568 105.987 51.2568 107.187C17.2568 108.387 5.75682 95.6868 4.25681 89.1868C2.65683 63.9868 8.92346 47.6868 12.2568 42.6868Z"
          fill="white"
        />
      </g>
      <path
        d="M11.26 90.2184C11.0888 66.8847 17.9323 43.1322 18.9432 42.7118C19.9541 42.2914 11.3814 28.628 14.2929 13.4932C19.0779 13.4932 30.0634 17.6132 36.5334 30.7301C38.3394 30.065 41.7589 29.0156 45.3561 28.628L43.2055 13.7034C40.7114 15.522 38.7574 16.2259 36.3312 15.385C34.7808 14.8478 34.3093 12.4422 35.9268 11.3911C37.2208 10.5503 40.4453 11.2322 43.2055 13.7034C44.4844 8.96095 45.4984 7.26551 47.6536 7.18701C49.0689 7.18701 50.6863 8.02784 49.8776 10.1299C49.3432 11.519 47.5181 12.6885 43.2055 13.7034L45.3561 28.628C48.2021 28.3213 51.1593 28.4289 53.5169 29.4688C54.0561 24.0735 56.4689 12.2319 62.6153 8.02781C65.3743 12.7511 72.2806 28.2344 69.6918 37.8771C73.0335 44.1287 81.9297 62.9512 81.2163 85.8041C59.573 107.724 23.1273 100.287 11.26 90.2184Z"
        fill="white"
      />
      <path
        d="M45.3561 28.628C41.7589 29.0156 38.3394 30.065 36.5334 30.7301C30.0634 17.6132 19.0779 13.4932 14.2929 13.4932C11.3814 28.628 19.9541 42.2914 18.9432 42.7118C17.9323 43.1322 11.0888 66.8847 11.26 90.2184C23.1273 100.287 59.573 107.724 81.2163 85.8041C81.9297 62.9512 73.0335 44.1287 69.6918 37.8771C72.2806 28.2344 65.3743 12.7511 62.6153 8.02781C56.4689 12.2319 54.0561 24.0735 53.5169 29.4688C51.1593 28.4289 48.2021 28.3213 45.3561 28.628ZM45.3561 28.628L43.2055 13.7034M43.2055 13.7034C44.4844 8.96095 45.4984 7.26551 47.6536 7.18701C49.0689 7.18701 50.6863 8.02784 49.8776 10.1299C49.3432 11.519 47.5181 12.6885 43.2055 13.7034ZM43.2055 13.7034C40.4453 11.2322 37.2208 10.5503 35.9268 11.3911C34.3093 12.4422 34.7808 14.8478 36.3312 15.385C38.7574 16.2259 40.7114 15.522 43.2055 13.7034Z"
        stroke="#090101"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <ellipse
        cx="32.2874"
        cy="48.3877"
        rx="4.04372"
        ry="4.20412"
        fill="#090101"
      />
      <ellipse
        cx="60.9978"
        cy="43.7632"
        rx="4.04372"
        ry="4.20412"
        fill="#090101"
      />
      <defs>
        <filter
          id="filter0_d_1044_166"
          x="0"
          y="0"
          width="94.8516"
          height="115.266"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1044_166"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1044_166"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
