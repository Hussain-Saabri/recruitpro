import React, { useEffect } from "react";
import { X ,SendHorizonal} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from ".";
export default function Modal({
  isOpen,
  onClose,
  title,
  icon,
  submitButton,
  disabled,
  cancelButton,
  children,
  onSubmit,
  submitButtonIcon,
  cancelButtonIcon,
  className = "max-w-2xl", // Can pass max-w-2xl, max-w-3xl, etc.
}) {
  console.log("cancelButtonIcon",cancelButtonIcon)
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">     
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          "bg-white rounded-xl shadow-2xl w-full max-h-[90vh] flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-4 px-6 border-b border-slate-100 sticky top-0 bg-white z-10 rounded-t-xl gap-4">
          <div className="flex items-start gap-3">
            {icon && (
              <div className="shrink-0 flex items-center justify-center text-brand-500 mt-[5px]">
                {icon}
              </div>
            )}
            <p className="text-[16px] leading-snug font-bold text-brand-500 tracking-tight m-0 pt-1">{title}</p>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 shrink-0 rounded-md text-black hover:text-white hover:bg-red-500 transition-colors cursor-pointer mt-0.5"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="overflow-y-auto p-6 bg-slate-50/30 flex-1">
          {children}
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 px-6 border-t gap-3 border-slate-100 bg-slate-50/50 rounded-b-xl flex flex-col-reverse sm:flex-row sm:justify-end shrink-0">
          {cancelButton && (
          <Button
            onClick={onClose}
            variant="outline"
            className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer h-9 font-medium w-full sm:w-auto flex justify-center items-center gap-1.5"
          >
          {cancelButtonIcon ? cancelButtonIcon  : <X size={16} strokeWidth={2.5} />} {cancelButton || "Cancel"}
          </Button>
          )}
          {submitButton && (<Button
            onClick={onSubmit}
            disabled={disabled}
            className="px-4 py-2 text-sm text-white bg-brand-600 hover:bg-brand-700 border border-transparent shadow-sm transition-all cursor-pointer h-9 font-medium w-full sm:w-auto flex justify-center items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
           {submitButtonIcon ? submitButtonIcon  : <SendHorizonal size={16} strokeWidth={2.5} />}{submitButton || "Submit"}
          </Button>)}
          
        </div>
      </div>
    </div>
  );
}
