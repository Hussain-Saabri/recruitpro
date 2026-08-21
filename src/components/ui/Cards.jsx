import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

export default function Cards({
  Icon,
  value,
  label,
  trend,
  chartData,
  colorTheme = "purple"
}) {
  
  const themeStyles = {
    purple: {
      iconBg: "bg-brand-500",
      iconShadow: "shadow-brand-500/10",
      valueColor: "text-brand-500",
      strokeColor: "#6C5CE7",
      hover: "hover:shadow-[0_8px_30px_rgba(109,93,246,0.05)] hover:border-[#6D5DF6]/50 active:border-[#6D5DF6]/50",
      topBarColor: "bg-[#6D5DF6]",
      bgGradient: "from-[#F5F4FF]/70"
    },
    green: {
      iconBg: "bg-emerald-500",
      iconShadow: "shadow-emerald-500/10",
      valueColor: "text-emerald-500",
      strokeColor: "#10B981",
      hover: "hover:shadow-[0_8px_30px_rgba(16,185,129,0.05)] hover:border-[#10B981]/50 active:border-[#10B981]/50",
      topBarColor: "bg-[#10B981]",
      bgGradient: "from-[#ECFDF5]/70"
    },
    orange: {
      iconBg: "bg-amber-500",
      iconShadow: "shadow-amber-500/10",
      valueColor: "text-amber-500",
      strokeColor: "#F59E0B",
      hover: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.05)] hover:border-[#F59E0B]/50 active:border-[#F59E0B]/50",
      topBarColor: "bg-[#F59E0B]",
      bgGradient: "from-[#FFFBEB]/70"
    },
    blue: {
      iconBg: "bg-blue-500",
      iconShadow: "shadow-blue-500/10",
      valueColor: "text-blue-500",
      strokeColor: "#3B82F6",
      hover: "hover:shadow-[0_8px_30px_rgba(59,130,246,0.05)] hover:border-[#3B82F6]/50 active:border-[#3B82F6]/50",
      topBarColor: "bg-[#3B82F6]",
      bgGradient: "from-[#EFF6FF]/70"
    }
  };

  const style = themeStyles[colorTheme] || themeStyles.purple;

  // Fallback data series driven by logic if chartData prop is not passed directly
  const dataPoints = chartData || [
    { v: 10 },
    { v: 16 },
    { v: 12 },
    { v: 22 },
    { v: 18 },
    { v: 26 },
    { v: 22 },
    { v: 34 }
  ];

  return (
    <div className={`group relative overflow-hidden bg-gradient-to-r ${style.bgGradient} via-white to-white p-3.5 sm:p-4 rounded-[8px] border border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex items-center justify-between transition-all duration-300 hover:scale-[1.02] active:scale-[1.02] cursor-pointer ${style.hover}`}>
      {/* Top Border Line Hover Highlight */}
      <div className={`absolute top-0 left-0 right-0 h-[4px] ${style.topBarColor} opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300`} />
      
      {/* Left Section: Icon & Details */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={`w-10 h-10 ${style.iconBg} ${style.iconShadow} rounded-lg flex items-center justify-center text-white shrink-0`}>
          {Icon && <Icon size={16} strokeWidth={2} />}
        </div>
        
        <div className="flex flex-col text-left">
          <h3 className={`text-[17.5px] font-bold leading-tight ${style.valueColor}`}>
            {value}
          </h3>
          <p className="text-gray-900 text-[11.2px] font-semibold">
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

      {/* Right Section: Recharts Sparkline Area Chart */}
      <div className="w-20 h-10 shrink-0 self-center pl-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataPoints} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <defs>
              <linearGradient id={`grad-${colorTheme}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={style.strokeColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={style.strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={style.strokeColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#grad-${colorTheme})`}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
