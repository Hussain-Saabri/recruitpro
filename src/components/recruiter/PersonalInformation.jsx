
import { Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {User,Cake,VenusAndMars,House,Building2,MapPin,Flag,ChartLine,Star,IdCard,Phone,Briefcase,Mail} from "lucide-react";
import { useEffect, useState } from "react";

export default function PersonalInformation({ jdData, submitTrigger, onValidationResult }) {   
    console.log("Inside the PersonalInformation",submitTrigger);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({});
    
    const [pan,setPan] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [role,setRole] = useState(jdData?.title || "");
    const [totalExp,setTotalExp] = useState("");
    const [relevantExp,setRelevantExp] = useState("");
    const [streetAddress,setStreetAddress] = useState("");
    const [city,setCity] = useState("");
    const[dob,setDob]=useState("");
    const[gender,setGender]=useState("");
    const[state,setState]=useState("");
    const[postalCode,setPostalCode]=useState("");
    const[workLocation,setWorkLocation]=useState("");
    
    useEffect(() => {
        if (submitTrigger.count > 0 && submitTrigger.step === 1) {
            const newErrors = {};
            if (!firstName.trim()) newErrors.firstName = "First Name is required";
            if (!lastName.trim()) newErrors.lastName = "Last Name is required";
            if (!gender) newErrors.gender = "Gender is required";
            if (!dob) newErrors.dob = "DOB is required";
            if (!pan) newErrors.pan = "PAN is required";
            if (!email) newErrors.email = "Email is required";
            if (!phone) newErrors.phone = "Phone is required";
            if (!role) newErrors.role = "Role is required";
            if (!totalExp) newErrors.totalExp = "Total Experience is required";
            if (!relevantExp) newErrors.relevantExp = "Relevant Experience is required";
            if (!streetAddress) newErrors.streetAddress = "Street Address is required";
            if (!city) newErrors.city = "City is required";
            if (!state) newErrors.state = "State is required";
            if (!postalCode) newErrors.postalCode = "Postal Code is required";
            if (!workLocation) newErrors.workLocation = "Work Location is required";
            setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
                // If everything is valid, tell parent it's OK and pass the data!
                const personalData = {
                    firstName,
                    lastName,
                    gender,
                    dob,
                    pan,
                    email,
                    phone,
                    role,
                    totalExp,
                    relevantExp,
                    streetAddress,
                    city,
                    state,
                    postalCode,
                    workLocation
                };
                onValidationResult(true, { personalInfo: personalData });
            }
        }
    }, [submitTrigger]);

    return (
        <>
            <FormCard
                title="Personal Information"
               
                icon ={<User className="fill-brand-500"/>}
            >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <Input
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors((prev) => ({ ...prev, firstName: "" }));
                }}
                className="w-full"
                labelIcon ={<User/>}
                required={true}
                error={errors?.firstName} 
                />
                <Input
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                labelIcon ={<User/>}
                onChange={(e) => {setLastName(e.target.value);
                    errors.lastName = "";
                }}
                required={true}
                error={errors?.lastName}
                
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
                onChange={(val) => {setGender(val);
                    errors.gender = "";
                }}
                required={true}
                className="w-full h-[42px]"
                 error={errors?.gender}
                />
                <Input
                label="DOB"
                labelIcon={<Cake />}
                type="date"
                placeholder="dd-mm-yyyy"
                value={dob}
                onChange={(e) =>{ errors.dob=""; setDob(e.target.value)}}
                required={true} 
                className="font-mono text-slate-500 text-[12px]"
                error={errors?.dob}
                />
                
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="PAN"
                type="text"
                placeholder="e.g. ABCDE1234F"
                value={pan}
                onChange={(e) =>{ errors.pan=""; setPan(e.target.value)}}
                className="w-full"
                labelIcon ={<IdCard  />}
                required={true} 
                error={errors?.pan}
                />
                <Input
                label="Email"
                type="text"
                placeholder="Enter email address"
                value={email}
                labelIcon ={<Mail />}
                onChange={(e) =>{ errors.email=""; setEmail(e.target.value)}}
                error={errors?.email}
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
                        errors.phone=""; setPhone(val);
                    }
                }}
                onKeyDown={(e) => {
                    if (["-", "+", "e", "E", "."].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                required={true}
                error={errors?.phone}
                />
                <Input
                label="Role"
                labelIcon={<Briefcase  />}
                type="text"
                placeholder=""
                value={role}
                readOnly
                required={true}
                error={errors?.role}
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
                    errors.totalExp="";
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
                error={errors?.totalExp}
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
                    errors.relevantExp="";
                }}
                onKeyDown={(e) => {
                    if (["-", "+", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                min={0}
                max={50}
                required={true} 
                error={errors?.relevantExp}
                />
                
                
            </div>   
            <div className="grid grid-cols-1 gap-2 mt-4">
                <Input
                label="Street Address"
                type="text"
                placeholder="Enter Street Address"
                value={streetAddress}
                onChange={(e) =>{setStreetAddress(e.target.value); errors.streetAddress="";}}
                className="w-full"
                labelIcon ={<IdCard  />}
                required={true} 
                error={errors?.streetAddress}
                />
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                <Input
                label="City"
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) =>{errors.city=""; setCity(e.target.value)}}
                className="w-full"
                labelIcon ={<Building2 />}
                required={true} 
                error={errors?.city}
                />
                <Input
                label="State"
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={(e) =>{errors.state=""; setState(e.target.value)}}
                
                className="w-full"
                labelIcon ={<MapPin  />}
                required={true} 
                error={errors?.state}
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
                    errors.postalCode="";
                }}
                onKeyDown={(e) => {
                    if (["-", "+", "e", "E", "."].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
                className="w-full"
                labelIcon ={<Flag />}
                required={true} 
                error={errors?.postalCode}
                />
                <Input
                label="Work Location"
                type="text"
                placeholder="Enter Work Location"
                value={workLocation}
                onChange={(e) =>{setWorkLocation(e.target.value);
                    errors.workLocation="";
                }}
                className="w-full"
                labelIcon ={<House />}
                required={true} 
                error={errors?.workLocation}
                />
                
            </div>                        
            </FormCard>            
            <div>
                
            </div>
            
              
            
 </>
    );
}