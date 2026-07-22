import Modal from "../ui/Modal";
import InfoSection from "../ui/InfoSection";
import ListSection from "../ui/ListSection";
import { User, Briefcase, MapPin, Calendar, GraduationCap, Building2, Tag, Award, Book } from "lucide-react";
import CandidateProfileCard from "./review/CandidateProfileCard";
const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function CandidateModal({ candidate, onClose }) {
    if (!candidate) return null;

    const initials = getInitials(candidate.name);
   
    const dateOnly = candidate.created ? candidate.created.split(" ")[0] : "N/A";

    return (
        <Modal 
          isOpen={!!candidate}
          onClose={onClose}
          title={candidate.name}
          icon={<User size={16} />}
          className="max-w-2xl"
        >   
        <CandidateProfileCard
                candidate={{
                        firstName: "Dadapir",
                                lastName: "Shaikh",
                                role: "Full Stack Developer",
                                location: "Goa",
                                submittedAt: "20 Jul 2026",
                            }}
        />

            
            

          
          <div className="mt-4 flex flex-col gap-4">
            <InfoSection 
              title="Personal Information"
              icon={<User size={14} strokeWidth={2.5} />}
              items={[
                { label: "First Name", value: candidate.name?.split(" ")[0] || "-" },
                { label: "Last Name", value: candidate.name?.split(" ")[1] || "-" },
                { label: "Gender", value: "Female" }, // Placeholder, update if available in data
                { label: "Date of Birth", value: "15/5/1990" }, // Placeholder
                { label: "PAN Number", value: "ABCDE1234F" }, // Placeholder
                { label: "Email", value: candidate.email },
                { label: "Phone", value: "+1234567890" }, // Placeholder
                { label: "Address", value: "123 Main St, New York, NY, 10001", fullWidth: true }
              ]}
            />
            

            {/* Education History */}
            <ListSection
              title="Education"
              icon={<GraduationCap size={14} strokeWidth={2.5} />}
              items={[
                {
                  title: "MIT",
                  icon: <GraduationCap size={20} strokeWidth={2} />,
                  badges: [
                    { text: "Bachelor of Science", icon: <Award size={10} /> },
                    { text: "Computer Science", icon: <Book size={10} /> },
                    { text: "Full-time", icon: <Tag size={10} /> }
                  ],
                  date: "— → 2012-05",
                  location: "Cambridge, MA"
                }
              ]}
            />

            {/* Employment History */}
            <ListSection
              title="Employment History"
              icon={<Briefcase size={14} strokeWidth={2.5} />}
              items={[
                {
                  title: "TechCorp Inc",
                  subtitle: "Senior Developer",
                  icon: <Briefcase size={20} strokeWidth={2} />,
                  badges: [
                    { text: "Full-time", icon: <Tag size={10} /> }
                  ],
                  date: "2018-06 → 2023-12",
                  location: "San Francisco, CA"
                }
              ]}
            />

            {/* Client Information */}
            <InfoSection 
              title="Client Information"
              icon={<Building2 size={14} strokeWidth={2.5} />}
              items={[
                { label: "Client Name", value: "Tech Corp" },
                { label: "Requirement ID", value: "REQ-2025-FS-001" },
                { label: "Work Type", value: "Virtual Drive" },
                { label: "Interview Type", value: "-" },
                { label: "Onboarding", value: "Contract to Hire" },
                { label: "Current CTC", value: "12 LPA" },
                { label: "Expected CTC", value: "15 LPA" },
                { label: "UAN Number", value: "123456789012" },
                { label: "Recruiter", value: "John Recruiter" },
              ]}
            />
          </div>
        </Modal>   
    )
}