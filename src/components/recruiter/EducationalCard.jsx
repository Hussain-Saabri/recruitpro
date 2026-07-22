import { Button, Input } from "../ui";
import {GraduationCap,Plus,Trash2 ,House,Building2,Flag,ChartLine,Star,IdCard,Phone,Briefcase,Mail, ClockCheckIcon} from "lucide-react";
import Separator from "../ui/Separator";


export default function EducationalCard({children,count,totalCount,onAdd,onRemove,isLast}) {
    return (
        <>        
        <div className="bg-slate-50/50 border border-gray-200 rounded-xl p-4 mb-4"> 
            <div className="flex items-center justify-between">
                <div className="flex items-center ">
                    <GraduationCap className="text-brand-600 font-bold"/>
                    <p className="text-xs font-medium text-brand-600 px-2 py-2 ">Education #{count}</p>
                </div>
            <div className="flex items-center justify-end">
               { totalCount > 1 && <Button
                variant="outline"
                size="sm"
                className="h-10 px-4 rounded-lg cursor-pointer border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 hover:text-red-700 transition-all duration-200 gap-2 shadow-sm"
                onClick={onRemove}
                >
                <Trash2 className="h-4 w-4 stroke-[2.3]" />
                    Remove
                </Button>
                
                }
               
            </div>

            </div>
            
            
            
            <Separator className="mt-4 mb-4 bg-brand-500"/>    
            <div className="p-4">
                {children}
            </div>
        </div>
        {
  isLast && (
    <Button
      variant="outline"
      size="sm"
      onClick={onAdd}
      className="border-brand-500 border-2 border-dotted text-brand-600 h-8 gap-1.5 mt-3"
    >
      <Plus className="text-white p-1 w-5 h-5 bg-brand-600 rounded-full stroke-[3px]" />
      Add Another Education
    </Button>
  )
}
        </>       
    );
}
