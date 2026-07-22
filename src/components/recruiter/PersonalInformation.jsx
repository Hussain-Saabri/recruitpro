
import { Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {User,Cake,VenusAndMars,House,Building2,MapPin,Flag,ChartLine,Star,IdCard,Phone,Briefcase,Mail} from "lucide-react";
import {useState} from "react";

export default function PersonalInformation() {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pan,setPan] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [role,setRole] = useState("To be change");
    const [totalExp,setTotalExp] = useState("");
    const [relevantExp,setRelevantExp] = useState("");
    const [streetAddress,setStreetAddress] = useState("");
    const [city,setCity] = useState("");
    const[dob,setDob]=useState("");
    const[gender,setGender]=useState("");
    const[state,setState]=useState("");
    const[postalCode,setPostalCode]=useState("");
    const[workLocation,setWorkLocation]=useState("");
    
    
    console.log(firstName);
    return (
        <>
            <FormCard
                title="Personal Information"
               
                icon ={<User className="fill-brand-500"/>}
            >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <Input
                label="First Name*"
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
                labelIcon ={<User/>}
                required={true} 
                />
                <Input
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                labelIcon ={<User/>}
                onChange={(e) => setLastName(e.target.value)}
                required={true} 
                />
                <Dropdown
                label="Gender"
                placeholder="Select Gender"
                labelIcon={<VenusAndMars />}
                options={[
                    {value:"Male", label:"Male"},
                    {value:"Female", label:"Female"},
                    {value:"Other", label:"Other"}
                ]}
                value={gender}
                onChange={(val) => setGender(val)}
                required={true}
                className="w-full h-[42px]"
                />
                <Input
                label="DOB"
                labelIcon={<Cake />}
                type="date"
                placeholder="dd-mm-yyyy"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required={true} 
                className="font-mono text-slate-500 text-[12px]"
                />
                
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="PAN"
                type="text"
                placeholder="e.g. ABCDE1234F"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="w-full"
                labelIcon ={<IdCard  />}
                required={true} 
                />
                <Input
                label="Email"
                type="text"
                placeholder="Enter email address"
                value={email}
                labelIcon ={<Mail />}
                onChange={(e) =>setEmail(e.target.value)}
                
                required={true} 
                />
                <Input
                label="Phone"
                labelIcon={<Phone />}
                type="Number"
                placeholder="Enter 10-Digit Mobile Number"
                value={phone}
                onChange={(e) =>{
                    let val = e.target.value;
                    if (val.length <= 10) {
                        setPhone(val);
                    }
                }}
                onKeyDown={(e) => {
                    if (["-", "+", "e", "E", "."].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                required={true} 
                />
                <Input
                label="Role"
                labelIcon={<Briefcase  />}
                type="text"
                placeholder=""
                value={role}
                readOnly
                required={true}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="Total Exp (Years)"
                type="number"
                placeholder="Enter Total Experience"
                value={totalExp}
                onChange={(e) => {
                    let val = e.target.value;
                    if (val === "" || (Number(val) >= 0 && Number(val) <= 15)) {
                        setTotalExp(val);
                    }
                }}
                onKeyDown={(e) => {
                    if (["-", "+", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                className="w-full"
                min={0}
                max={50}
                labelIcon ={<ChartLine />}
                required={true} 
                />
                <Input
                label="Relevant Experience"
                type="number"
                placeholder="Enter Relevant Experience"
                value={relevantExp}
                labelIcon ={<Star/>}
                onChange={(e) => {
                    let val = e.target.value;
                    if (val === "" || (Number(val) >= 0 && Number(val) <= 15)) {
                        setRelevantExp(val);
                    }
                }}
                onKeyDown={(e) => {
                    if (["-", "+", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                min={0}
                max={50}
                required={true} 
                />
                
                
            </div>   
            <div className="grid grid-cols-1 gap-2 mt-4">
                <Input
                label="Street Address"
                type="text"
                placeholder="Enter Street Address"
                value={streetAddress}
                onChange={(e) =>setStreetAddress(e.target.value)}
                className="w-full"
                labelIcon ={<IdCard  />}
                required={true} 
                />
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="City"
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full"
                labelIcon ={<Building2 />}
                required={true} 
                />
                <Input
                label="State"
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={(e) =>setState(e.target.value)}
                
                className="w-full"
                labelIcon ={<MapPin  />}
                required={true} 
                />
                <Input
                label="Postal Code"
                type="number"
                placeholder="Enter 6-digit PIN Code"
                value={postalCode}
                onChange={(e) => {
                    let val = e.target.value;
                    if (val.length <= 6) {
                        setPostalCode(val);
                    }
                }}
                onKeyDown={(e) => {
                    if (["-", "+", "e", "E", "."].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                className="w-full"
                labelIcon ={<Flag />}
                required={true} 
                />
                <Input
                label="Work Location"
                type="text"
                placeholder="Enter Work Location"
                value={workLocation}
                onChange={(e) =>setWorkLocation(e.target.value)}
                className="w-full"
                labelIcon ={<House />}
                required={true} 
                />
                
            </div>                        
            </FormCard>            
            <div>
                
            </div>
            
              
            
 </>
    );
}