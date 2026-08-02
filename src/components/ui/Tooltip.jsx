import React from 'react';

export default function Tooltip({ text, children, position = "bottom" }) {
  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div className="group relative inline-flex items-center justify-center">
      {children}
      <span className={`absolute ${positionClasses[position] || positionClasses.bottom} bg-slate-800 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[100] shadow-sm`}>
        {text}
      </span>
    </div>
  );
}
