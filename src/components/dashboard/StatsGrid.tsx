import {
  School,
  MapPin,
  GraduationCap,
  Phone,
  Trophy,
  User,
  Sparkles,
} from "lucide-react";

interface StatsGridProps {
  userData: {
    age?: string;
    email?: string;
    schoolName?: string;
    city?: string;
    region?: string;
    gread?: string;
    phoneNumber?: string;
    points?: number;
  } | null;
}

export default function StatsGrid({ userData }: StatsGridProps) {
  // Debug: Log the userData to see what we're receiving
  console.log("StatsGrid received userData:", userData);

  // Return early if userData is null
  if (!userData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full text-center py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Personal Info",
      items: [
        { label: "Age", value: userData?.age ?? "Not provided" },
        { label: "Email", value: userData?.email ?? "Not provided" },
      ],
      icon: <User className="w-5 h-5" />,
      bgColor: "from-[#07705d]/10 to-[#07705d]/5",
      borderColor: "border-[#07705d]/20",
    },
    {
      label: "Location",
      items: [
        { label: "School", value: userData?.schoolName ?? "Not provided" },
        { label: "City", value: userData?.city ?? "Not provided" },
        { label: "Region", value: userData?.region ?? "Not provided" },
      ],
      icon: <MapPin className="w-5 h-5" />,
      bgColor: "from-[#bf8c13]/10 to-[#bf8c13]/5",
      borderColor: "border-[#bf8c13]/20",
    },
    {
      label: "Academic",
      items: [{ label: "Grade", value: userData?.gread ?? "Not provided" }],
      icon: <GraduationCap className="w-5 h-5" />,
      bgColor: "from-[#c7cc3f]/10 to-[#c7cc3f]/5",
      borderColor: "border-[#c7cc3f]/20",
    },
    {
      label: "Contact",
      items: [
        { label: "Phone", value: userData?.phoneNumber ?? "Not provided" },
      ],
      icon: <Phone className="w-5 h-5" />,
      bgColor: "from-[#07705d]/10 to-[#bf8c13]/10",
      borderColor: "border-[#07705d]/20",
    },
    {
      label: "Achievement",
      items: [{ label: "Points", value: userData?.points ?? 0 }],
      icon: <Sparkles className="w-5 h-5" />,
      bgColor: "from-[#bf8c13]/10 to-[#c7cc3f]/10",
      borderColor: "border-[#bf8c13]/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`relative rounded-lg overflow-hidden border-2 ${stat.borderColor} bg-gradient-to-br ${stat.bgColor}`}
        >
          <div className="relative z-10 p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-white/80 text-[#07705d] mr-3">
                {stat.icon}
              </div>
              <h3 className="text-lg font-sendako font-bold text-[#07705d]">
                {stat.label}
              </h3>
              {index === 4 && (
                <Trophy className="w-5 h-5 text-[#bf8c13] ml-auto" />
              )}
            </div>

            <div className="space-y-3">
              {stat.items.map((item: any) => (
                <div key={item.label} className="bg-white/50 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium text-sm">
                      {item.label}
                    </span>
                    {item.label === "Points" ? (
                      <div className="flex items-center space-x-2 bg-[#07705d]/10 px-3 py-1 rounded-full">
                        <Trophy className="w-4 h-4 text-[#bf8c13]" />
                        <span className="font-bold text-[#07705d]">
                          {item.value}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-[#07705d]">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
