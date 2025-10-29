"use client";
import { useState } from "react";
import {
  Edit,
  Save,
  X,
  Trophy,
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Calendar,
} from "lucide-react";
import { apiUrl } from "@/apiConfig";
import { getAccessToken } from "@/lib/tokenManager";

interface ProfileTabProps {
  userData: any;
  onUserDataUpdate: (newData: any) => void;
}

export default function ProfileTab({
  userData,
  onUserDataUpdate,
}: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    grandName: userData?.grandName || "",
    email: userData?.email || "",
    phoneNumber: userData?.phoneNumber || "",
    age: userData?.age || "",
    gread: userData?.gread || "",
    schoolName: userData?.schoolName || "",
    city: userData?.city || "",
    region: userData?.region || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const accessToken = getAccessToken();
      const response = await fetch(`${apiUrl}/newlogin/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      onUserDataUpdate({ ...userData, ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      grandName: userData?.grandName || "",
      email: userData?.email || "",
      phoneNumber: userData?.phoneNumber || "",
      age: userData?.age || "",
      gread: userData?.gread || "",
      schoolName: userData?.schoolName || "",
      city: userData?.city || "",
      region: userData?.region || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-sendako font-bold text-[#07705d] mb-2">
          Profile Management
        </h2>
        <p className="text-gray-600">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border-2 border-[#07705d]/20 p-6 text-center">
            <div className="relative inline-block mb-4">
              {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-[#07705d] mx-auto"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-full flex items-center justify-center mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>

            <h3 className="text-xl font-sendako font-bold text-[#07705d] mb-1">
              {userData?.firstName} {userData?.lastName}
            </h3>
            <p className="text-gray-600 mb-2">{userData?.grandName}</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 mb-4">
              Active Account
            </div>

            {userData?.points && (
              <div className="bg-gradient-to-r from-[#bf8c13]/10 to-[#c7cc3f]/10 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-2 text-[#07705d]">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold">Points Scored</span>
                </div>
                <div className="text-2xl font-bold text-[#bf8c13] mt-1">
                  {userData.points}
                </div>
              </div>
            )}

            <button className="w-full bg-[#07705d] text-white py-2 px-4 rounded-lg hover:bg-[#07705d]/90 transition-colors">
              Check Available Prizes
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg border-2 border-[#07705d]/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-sendako font-bold text-[#07705d]">
                  Personal Information
                </h3>
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#bf8c13] text-white rounded-lg hover:bg-[#bf8c13]/90 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#07705d] text-white rounded-lg hover:bg-[#07705d]/90 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSubmitting ? "Saving..." : "Save"}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.lastName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grand Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="grandName"
                      value={formData.grandName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.grandName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.age}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-[#bf8c13]/20 p-6">
              <h3 className="text-xl font-sendako font-bold text-[#bf8c13] mb-6">
                Account Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gread"
                      value={formData.gread}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.gread}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.phoneNumber || "Not Set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.schoolName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.city}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07705d]/20 focus:border-[#07705d]"
                    />
                  ) : (
                    <div className="bg-gray-50 px-3 py-2 rounded-lg">
                      {userData?.region}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-[#c7cc3f]/20 p-6">
              <h3 className="text-xl font-sendako font-bold text-[#c7cc3f] mb-6">
                Security
              </h3>
              <button
                type="button"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
