import { cn } from "@/lib/utils";
import Badge from "../../ui/Badge";
import { Award, Book, Tag, Calendar, MapPin, Building } from "lucide-react";

export default function ReviewListSection({
  title,
  icon,
  cardIcon,
  items = [],
  className,
}) {
  return (
    <div className={cn(
      "overflow-hidden rounded-2xl border border-violet-100 bg-white",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-100 bg-violet-50/40 px-3 py-1.5">
        <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-violet-100 text-violet-600">
            {icon}
            </div>

            <h2 className="text-[12.5px] font-semibold text-slate-800">
            {title}
            </h2>
        </div>
        <div className="bg-violet-100 text-violet-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {items.length} record(s)
        </div>
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2.5">
        {items.map((item, index) => (
            <div key={index} className="border border-slate-100 bg-slate-50/30 rounded-lg p-3 flex items-start gap-3 relative">
                <div className="absolute top-3 right-3 text-violet-200 font-bold text-[12px]">
                    #{index + 1}
                </div>
                
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 shrink-0 mt-0.5">
                    {cardIcon}
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                    <h3 className="text-[13.5px] font-semibold text-slate-800 leading-none">
                        {item.title}
                    </h3>
                    
                    {item.subtitle && (
                        <p className="text-[11.5px] text-violet-600 font-medium leading-none mb-0.5">
                            {item.subtitle}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-1.5">
                        {item.badge1 && (
                            <Badge variant="secondary" className="gap-1 text-violet-600 bg-violet-100 hover:bg-violet-100 border-none font-medium px-1.5 py-0.5 text-[10px] h-5">
                                <Award size={11} fill="currentColor"/>
                                {item.badge1}
                            </Badge>
                        )}
                        {item.badge2 && (
                            <Badge variant="secondary" className="gap-1 text-violet-600 bg-violet-100 hover:bg-violet-100 border-none font-medium px-1.5 py-0.5 text-[10px] h-5">
                                <Book size={11} fill="currentColor" />
                                {item.badge2}
                            </Badge>
                        )}
                        {item.badge4 && (
                            <Badge variant="secondary" className="gap-1 text-violet-600 bg-violet-100 hover:bg-violet-100 border-none font-medium px-1.5 py-0.5 text-[10px] h-5">
                                <Building size={11} fill="currentColor" />
                                {item.badge4}
                            </Badge>
                        )}
                        {item.badge3 && (
                            <Badge variant="secondary" className="gap-1 text-violet-600 bg-violet-100 hover:bg-violet-100 border-none font-medium px-1.5 py-0.5 text-[10px] h-5">
                                <Tag size={11} fill="currentColor" />
                                {item.badge3}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-[11.5px] font-medium mt-0.5">
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {item.dateRange}
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            {item.location}
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
