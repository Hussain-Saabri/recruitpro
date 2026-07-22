import FormCard from "../ui/FormCard";
import {FileUp,FolderOpen} from "lucide-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import { FaFilePdf  } from "react-icons/fa6"
import { Button,Input } from "../ui";
import { useRef ,useState} from "react";

export default function ResumeUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
   
    const [previewUrl, setPreviewUrl] = useState(null);
    {/*Resume Upload Button */}  
    const handleResumeUpload = () => {
        fileInputRef.current.click();    
    }      
    const handleFileChange = (event) => {
       
       const file = event.target.files[0];
       setSelectedFile(file);
        console.log(selectedFile)
       if (file.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    } 
        
    }  
    return (
        <>
            <FormCard
                title="Resume Upload"               
                icon ={<FileUp  />}
            >   
            <div className="border-2 border-dashed mb-2 border-brand-100 rounded-[5px] py-8 px-6 flex flex-col gap-3 items-center justify-center text-center">
                <FontAwesomeIcon icon={faCloudArrowUp} style={{color: "rgb(177, 151, 252)",fontSize: "50px",}} />
                <h3  className="text-sm font-semibold text-slate-800">
                Drag &amp; Drop your resume here
                </h3>
                <p className="text-xs font-medium text-slate-500 my-2">OR</p>
                <Button size="sm" onClick={handleResumeUpload} className="bg-brand-500 hover:bg-brand-600 text-white px-5 rounded-[5px] gap-2 cursor-pointer ">
                <FolderOpen className="h-4 w-4" /> Browse File
                </Button>
                <Input 
                type="file" 
                accept=".pdf,.doc,.docx"
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
                />
                <p className="text-[12px] text-slate-400">
                PDF, DOC, DOCX supported • Max 10 MB
                </p>
                
                
            </div>  
           {
  selectedFile && (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 mb-2">

      
      <div className="flex items-center gap-4">
        {selectedFile.type === "application/pdf" ? (
          <FaFilePdf className="text-red-500 text-4xl" />
        ) : (
          <FaFileWord className="text-red-500 text-4xl" />
        )}

        <div>
          <span className="font-semibold text-[12.5px] text-slate-800">
            {selectedFile.name}
          </span>

          <p className="text-[12.5px] text-slate-500">
            {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
          </p>
        </div>

      </div>

      
      <Button
         onClick={() => {
        setSelectedFile(null);
        setPreviewUrl(null);
    }}
        className="border bg-slate-100 hover:bg-slate-200 text-black border-gray-200 text-[12.5px] font-semibold rounded-[5px] py-1 px-2 hover:bg-gray-100 cursor-pointer"
      >
        X
      </Button>

    </div>

    
  )
}

{
    previewUrl && (
        <div className="mt-4 flex flex-col gap-3">

        <p className="text-sm font-medium text-slate-800 ">Preview File</p>
        <iframe
            src={previewUrl}
            width="100%"
            height="600"
            title="PDF Preview"
        />
        </div>
    )
}
            </FormCard>                                                                                       
        </>
    );
}