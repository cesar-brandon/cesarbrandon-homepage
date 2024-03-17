interface StickerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Sticker({
  children,
  className,
  ...props
}: StickerProps) {
  return (
    <div className="absolute -right-8 top-8 bg-orange-500 h-4 md:h-6 xl:h-10 w-10 md:w-20 z-10" />
  );
}
