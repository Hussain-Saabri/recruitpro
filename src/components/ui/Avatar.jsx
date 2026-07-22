import { cn } from "@/lib/utils";

export default function Avatar({
  src,
  alt = "Avatar",
  fallback = "",
  size = "md",
  className,
}) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl",
  };

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-brand-500 text-white flex items-center justify-center font-semibold shrink-0",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        fallback
      )}
    </div>
  );
}