import { User } from "lucide-react";

interface ProfileCardProps {
  userData: {
    firstName: string;
    lastName: string;
    grandName: string;
    profileImage?: string;
  };
}

export default function ProfileCard({ userData }: ProfileCardProps) {
  return (
    <div className="px-6 pb-6 border-b border-gray-200">
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          {userData.profileImage ? (
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-primaryColor"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-primaryColor to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          {userData.firstName} {userData.lastName}
        </h2>
        {userData.grandName && (
          <p className="text-sm text-gray-500 mt-0.5">{userData.grandName}</p>
        )}
      </div>
    </div>
  );
}
