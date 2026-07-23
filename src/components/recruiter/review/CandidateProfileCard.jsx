import { Briefcase, MapPin, Clock } from "lucide-react";
import Avatar from "../../ui/Avatar";
import Badge from "../../ui/Badge";

export default function CandidateProfileCard({
  candidate,
}) {
  if (!candidate) return null;

  const {
    firstName,
    lastName,
    role,
    location,
    submittedAt,
  } = candidate;

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Avatar
            size="xl"
            fallback={fullName
              ?.split(" ")
              .map((name) => name[0])
              .join("")
              .substring(0, 2)}
          />

          <div className="space-y-2">
            <p className="text-[15px] font-bold text-black">
              {fullName}
            </p>

            <div className="flex flex-wrap items-center  gap-2">
              {role && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-brand-100 text-brand-600 border border-gray-100"
                >
                  <Briefcase size={14} />
                  {role}
                </Badge>
              )}

              {location && (
                <Badge
                  variant="outline"
                  className="gap-1 bg-brand-100 text-brand-600 border border-gray-100"
                >
                  <MapPin size={14} />
                  {location}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        {submittedAt && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock size={15} />
            <span>{submittedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}