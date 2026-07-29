export default function PageHeader({ title, subtitle, className = "", rightAction }) {
  return (
    <div className={`flex justify-between items-start sm:items-center ${className}`}>
      <div className="flex flex-col">
        <h2 className="font-bold !text-brand-500 !m-0 leading-tight tracking-tight capitalize">
          {title}
        </h2>
        <p className="text-[12.25px] text-gray-600">
          {subtitle}
        </p>
      </div>
      {rightAction && (
        <div className="mt-3 sm:mt-0">
          {rightAction}
        </div>
      )}
    </div>
  );
}
