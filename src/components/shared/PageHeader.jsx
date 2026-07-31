export default function PageHeader({ title, subtitle, className = "", rightAction, icon: Icon }) {
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 relative ${className}`}>
      
      <div className="flex items-center gap-3 relative z-10">
        {Icon && (
          <div className="hidden sm:flex p-2.5 bg-brand-50/80 border border-brand-100 rounded-xl shadow-sm text-brand-600">
            <Icon size={22} strokeWidth={2.5} />
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-2xl sm:text-[28px] font-extrabold bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent leading-tight tracking-tight capitalize pb-0.5">
            {title}
          </p>
          {subtitle && (
            <p className="text-[13.5px] text-slate-500 font-medium tracking-wide mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {rightAction && (
        <div className="mt-4 sm:mt-0 relative z-10 flex items-center">
          {rightAction}
        </div>
      )}
    </div>
  );
}
