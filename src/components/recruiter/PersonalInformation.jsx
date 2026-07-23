import { Input } from "../ui";
import Dropdown from "../ui/Dropdown";
import FormCard from "../ui/FormCard";
import {User,Cake,VenusAndMars,House,Building2,MapPin,Flag,ChartLine,Star,IdCard,Phone,Briefcase,Mail} from "lucide-react";
import { useEffect, useState } from "react";

const indianStates = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
    { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "Delhi", label: "Delhi" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" }
];

export default function PersonalInformation({ jdData, submitTrigger, onValidationResult }) {   
   
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
    const [dob,setDob]=useState("");
    const [gender,setGender]=useState("");
    const [state,setState]=useState("");
    const [postalCode,setPostalCode]=useState("");
    const [workLocation,setWorkLocation]=useState("");
    
    useEffect(() => {
        if (submitTrigger.count > 0 && submitTrigger.step === 1) {
            const newErrors = {};
            
            // First Name validation
            if (!firstName.trim()) {
                newErrors.firstName = "First Name is required";
            } else if (!/^[A-Za-z]{2,}$/.test(firstName)) {
                newErrors.firstName = "Letters only, minimum 2 characters";
            }
            
            if (!lastName.trim()) newErrors.lastName = "Last Name is required";
            if (!gender) newErrors.gender = "Gender is required";
            
            // DOB Validation (At least 18 years old)
            if (!dob) {
                newErrors.dob = "DOB is required";
            } else {
                const birthDate = new Date(dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 18) {
                    newErrors.dob = "Candidate must be at least 18 years old";
                }
            }

            // PAN Validation
            if (!pan) {
                newErrors.pan = "PAN is required";
            } else if (!/^[A-Za-z0-9]{10}$/.test(pan)) {
                newErrors.pan = "PAN must be a 10-character alphanumeric code (e.g. ABCDE1234F)";
            }

            // Email Validation
            if (!email) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors.email = "Enter a valid email address";
            }

            // Phone Validation
            if (!phone) {
                newErrors.phone = "Phone is required";
            } else if (!/^\d{10}$/.test(phone)) {
                newErrors.phone = "Enter a valid 10-digit number without country code";
            }

            if (!role) newErrors.role = "Role is required";
            if (!totalExp) newErrors.totalExp = "Total Experience is required";
            
            // Relevant Exp Validation
            if (!relevantExp) {
                newErrors.relevantExp = "Relevant Experience is required";
            } else if (Number(relevantExp) > Number(totalExp)) {
                newErrors.relevantExp = "Relevant exp cannot exceed total exp";
            }

            // Street Address Validation
            if (!streetAddress) {
                newErrors.streetAddress = "Street Address is required";
            } else if (streetAddress.length < 5 || !/[a-zA-Z]/.test(streetAddress)) {
                newErrors.streetAddress = "Enter a valid street address (min 5 characters, letters required)";
            }

            if (!city) newErrors.city = "City is required";
            if (!state) newErrors.state = "State is required";

            // Postal Code Validation
            if (!postalCode) {
                newErrors.postalCode = "Postal Code is required";
            } else if (!/^\d{6}$/.test(postalCode)) {
                newErrors.postalCode = "Enter a valid 6-digit PIN code";
            }

            // Work Location Validation
            if (!workLocation) {
                newErrors.workLocation = "Work Location is required";
            } else if (/\d/.test(workLocation)) {
                newErrors.workLocation = "Enter a valid location (no numbers)";
            }

            setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
                const personalData = {
                    firstName, lastName, gender, dob, pan, email, phone, role,
                    totalExp, relevantExp, streetAddress, city, state, postalCode, workLocation
                };
                onValidationResult(true, { personalInfo: personalData });
            } else {
                onValidationResult(false, null);
            }
        }
    }, [submitTrigger]);

    const handlePhoneChange = (e) => {
        const val = e.target.value;
        setPhone(val);
        if (/[^0-9]/.test(val)) {
            setErrors((prev) => ({ ...prev, phone: "Enter a valid 10-digit number without country code" }));
        } else {
            setErrors((prev) => ({ ...prev, phone: "" }));
        }
    };

    const handlePostalCodeChange = (e) => {
        const val = e.target.value;
        setPostalCode(val);
        if (/[^0-9]/.test(val)) {
            setErrors((prev) => ({ ...prev, postalCode: "Enter a valid 6-digit PIN code" }));
        } else {
            setErrors((prev) => ({ ...prev, postalCode: "" }));
        }
    };

    return (
        <>
            <FormCard
                title="Personal Information"
                icon={<User className="fill-brand-500"/>}
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
                    labelIcon={<User/>}
                    required={true}
                    error={errors?.firstName} 
                />
                <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    labelIcon={<User/>}
                    onChange={(e) => {
                        setLastName(e.target.value);
                        setErrors((prev) => ({ ...prev, lastName: "" }));
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
                    onChange={(val) => {
                        setGender(val);
                        setErrors((prev) => ({ ...prev, gender: "" }));
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
                    onChange={(e) => {
                        setDob(e.target.value);
                        setErrors((prev) => ({ ...prev, dob: "" }));
                    }}
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
                    onChange={(e) => { 
                        setPan(e.target.value.toUpperCase()); 
                        setErrors((prev) => ({ ...prev, pan: "" }));
                    }}
                    className="w-full"
                    labelIcon={<IdCard />}
                    required={true} 
                    error={errors?.pan}
                    maxLength={10}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    labelIcon={<Mail />}
                    onChange={(e) => { 
                        setEmail(e.target.value); 
                        setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    error={errors?.email}
                    required={true} 
                />
                <Input
                    label="Phone"
                    labelIcon={<Phone />}
                    type="text"
                    placeholder="Enter 10-Digit Mobile Number"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    required={true}
                    error={errors?.phone}
                />
                <Input
                    label="Role"
                    labelIcon={<Briefcase />}
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
                        if (val === "" || (Number(val) >= 0 && Number(val) <= 50)) {
                            setTotalExp(val);
                        }
                        setErrors((prev) => ({ ...prev, totalExp: "" }));
                    }}
                    className="w-full"
                    min={0}
                    max={50}
                    labelIcon={<ChartLine />}
                    required={true} 
                    error={errors?.totalExp}
                />
                <Input
                    label="Relevant Experience"
                    type="number"
                    placeholder="Enter Relevant Experience"
                    value={relevantExp}
                    labelIcon={<Star/>}
                    onChange={(e) => {
                        let val = e.target.value;
                        if (val === "" || (Number(val) >= 0 && Number(val) <= 50)) {
                            setRelevantExp(val);
                        }
                        setErrors((prev) => ({ ...prev, relevantExp: "" }));
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
                    onChange={(e) => {
                        setStreetAddress(e.target.value); 
                        setErrors((prev) => ({ ...prev, streetAddress: "" }));
                    }}
                    className="w-full"
                    labelIcon={<IdCard />}
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
                    onChange={(e) => {
                        setCity(e.target.value);
                        setErrors((prev) => ({ ...prev, city: "" }));
                    }}
                    className="w-full"
                    labelIcon={<Building2 />}
                    required={true} 
                    error={errors?.city}
                />
                <Dropdown
                    label="State"
                    placeholder="Select State"
                    labelIcon={<MapPin />}
                    options={indianStates}
                    value={state}
                    onChange={(val) => {
                        setState(val);
                        setErrors((prev) => ({ ...prev, state: "" }));
                    }}
                    required={true}
                    className="w-full h-[42px]"
                    error={errors?.state}
                    direction="up"
                    searchable={true}
                />
                <Input
                    label="Postal Code"
                    type="text"
                    placeholder="Enter 6-digit PIN Code"
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    maxLength={6}
                    className="w-full"
                    labelIcon={<Flag />}
                    required={true} 
                    error={errors?.postalCode}
                />
                <Input
                    label="Work Location"
                    type="text"
                    placeholder="Enter Work Location"
                    value={workLocation}
                    onChange={(e) => {
                        setWorkLocation(e.target.value);
                        setErrors((prev) => ({ ...prev, workLocation: "" }));
                    }}
                    className="w-full"
                    labelIcon={<House />}
                    required={true} 
                    error={errors?.workLocation}
                />
            </div>                        
            </FormCard>            
        </>
    );
}