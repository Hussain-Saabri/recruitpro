
import { XIcon } from 'lucide-react'
import Badge from "./Badge";
import Button from "./Button";
export function FilterBadge({data = "Data",value = "Value",onClick}) {
    return (
        <Badge variant="outline" className="gap-3 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md normal-case font-medium">
           {data ? <p className="text-brand-500">{data}: {value}</p> :<p className="text-brand-500">{value}</p>}
            <Button
                onClick={onClick}
                variant="ghost"
                size="icon"
                className="size-5 text-brand-500 hover:bg-brand-500 hover:text-white cursor-pointer rounded-[5px] transition-colors"
            >
                <XIcon className="size-3.5" />
            </Button>
        </Badge>
    );
}