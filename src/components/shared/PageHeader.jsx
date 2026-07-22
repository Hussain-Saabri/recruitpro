export default function PageHeader({ title, subtitle, className = "" }) {
  return (
    <div className={`flex flex-col  ${className}`}>
      <h2 className="font-bold !text-brand-500 !m-0 leading-tight tracking-tight capitalize">
        {title}
      </h2>
      <p className="text-[12.25px] text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}
