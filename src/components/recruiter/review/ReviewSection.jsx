import { cn } from "@/lib/utils";

export default function ReviewSection({
  title,
  icon,
  items = [],
  columns = 3,
  className,
}) {
  return (
    <div className={cn(
      "overflow-hidden rounded-2xl border border-violet-100 bg-white",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-violet-100 bg-violet-50/40 px-3 py-1.5">
        <div className="flex items-center justify-center text-brand-500">
          {icon}
        </div>

        <p className="text-[12.5px] font-semibold text-brand-500 mt-[1px]">
          {title}
        </p>
      </div>

      {/* Body */}
      <div
        className={cn(
          "grid",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {items.map((item, index) => {
          // Blank Cell
          if (item.empty) {
            return (
              <div
                key={index}
                className="min-h-[45px] bg-violet-50/40 border-r border-b border-violet-100 hidden sm:block"
              />
            );
          }

          return (
            <div
              key={index}
              className={cn(
                "border-r border-b border-violet-100 px-4 py-2",
                item.fullWidth && "col-span-full"
              )}
            >
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {item.label}
              </p>

              <p className="text-[13.5px] font-medium text-slate-800 break-words">
                {item.value || "-"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}