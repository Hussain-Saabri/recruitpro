import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { FaFilePdf } from "react-icons/fa6";

export default function ReviewResumeSection({
  title = "Resume",
  icon = <FileText size={14} />,
  file, // e.g. { name: "Dadapir_Shaikh_Resume.pdf", size: "108.6 KB" }
  className,
}) {
  return (
    <div className={cn(
      "overflow-hidden rounded-2xl border border-violet-100 bg-white",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-violet-100 bg-violet-50/40 px-3 py-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-violet-100 text-violet-600">
          {icon}
        </div>
        <h2 className="text-[12.5px] font-semibold text-slate-800">
          {title}
        </h2>
      </div>

      {/* Body */}
      <div className="p-3">
        {file ? (
          <div className="border border-slate-100 bg-slate-50/30 rounded-lg p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 shrink-0">
                <FaFilePdf size={18} />
              </div>
              <div className="flex flex-col gap-0.5 max-w-[calc(100%-2rem)]">
                <h3 className="text-[13.5px] font-semibold text-slate-800 break-all">
                  {file.name}
                </h3>
                <p className="text-[11.5px] text-slate-400 font-medium">
                  {file.size} • Ready to submit
                </p>
              </div>
            </div>
            <CheckCircle2 size={16} className="text-emerald-500 mr-2" />
          </div>
        ) : (
          <div className="border border-red-100 bg-red-50/30 rounded-lg p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100/50 shrink-0">
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[13.5px] font-semibold text-slate-800">
                  No resume uploaded
                </h3>
                <p className="text-[11.5px] text-slate-400 font-medium">
                  Go back to Section 5 to add a resume
                </p>
              </div>
            </div>
            <AlertTriangle size={16} className="text-red-500 mr-2" />
          </div>
        )}
      </div>
    </div>
  );
}
