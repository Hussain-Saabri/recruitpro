import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Cards({
  Icon,
  value,
  label,
  trend,
  colorTheme = "purple"
}) {
  
  const themeStyles = {
    purple: {
      iconBg: "bg-brand-500",
      iconShadow: "shadow-brand-500/10",
      valueColor: "text-brand-500",
      hover: "hover:shadow-[0_8px_30px_rgba(109,93,246,0.05)] hover:border-[#6D5DF6]/50 active:border-[#6D5DF6]/50",
      topBarColor: "bg-[#6D5DF6]",
      bgGradient: "from-[#F5F4FF]/70"
    },
    green: {
      iconBg: "bg-emerald-500",
      iconShadow: "shadow-emerald-500/10",
      valueColor: "text-emerald-500",
      hover: "hover:shadow-[0_8px_30px_rgba(16,185,129,0.05)] hover:border-[#10B981]/50 active:border-[#10B981]/50",
      topBarColor: "bg-[#10B981]",
      bgGradient: "from-[#ECFDF5]/70"
    },
    orange: {
      iconBg: "bg-amber-500",
      iconShadow: "shadow-amber-500/10",
      valueColor: "text-amber-500",
      hover: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.05)] hover:border-[#F59E0B]/50 active:border-[#F59E0B]/50",
      topBarColor: "bg-[#F59E0B]",
      bgGradient: "from-[#FFFBEB]/70"
    },
    blue: {
      iconBg: "bg-blue-500",
      iconShadow: "shadow-blue-500/10",
      valueColor: "text-blue-500",
      hover: "hover:shadow-[0_8px_30px_rgba(59,130,246,0.05)] hover:border-[#3B82F6]/50 active:border-[#3B82F6]/50",
      topBarColor: "bg-[#3B82F6]",
      bgGradient: "from-[#EFF6FF]/70"
    }
  };

  const style = themeStyles[colorTheme] || themeStyles.purple;

  return (

    <div className={` group relative overflow-hidden bg-gradient-to-r ${style.bgGradient} via-white to-white p-4 rounded-[8px] border border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex items-start gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[1.02] cursor-pointer ${style.hover}`}>
      {/* Top Border Line Hover Highlight */}
      <div className={`absolute top-0 left-0 right-0 h-[4px] ${style.topBarColor} opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300`} />
      
      {/* Icon size changed to w-12 h-12 and rounded-lg to match target project sizes */}
      <div className={`w-10 h-10 ${style.iconBg} ${style.iconShadow} rounded-lg flex items-center justify-center text-white shrink-0`}>
        {Icon && <Icon size={15} strokeWidth={2} />}
      </div>
      <div className="flex flex-col text-left ">
        <h3 className={`text-[17.5px] font-bold leading-tight ${style.valueColor}`}>
          {value}
        </h3>
        <p className="text-gray-900 text-[11.2px] font-semibold ">
          {label}
        </p>
        {trend && (
          <div className={`mt-1 flex items-center gap-1 text-[9.8px] leading-none font-bold ${trend.isUp ? "text-emerald-500" : "text-rose-500"}`}>
            {trend.isUp ? (
              <ArrowUp size={12} strokeWidth={3} className="shrink-0" />
            ) : (
              <ArrowDown size={12} strokeWidth={3} className="shrink-0" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
