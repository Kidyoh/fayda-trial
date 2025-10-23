"use client";
import React from "react";
import { UserCircle, LogOut, Settings, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";

export function NavAuth() {
  const { isAuthenticated, clearAuth } = useAuth();
  const { user } = useUserStore();

  const handleLogout = () => {
    clearAuth();
    // Redirect to home or login page
    window.location.href = "/";
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-[#c7cc3f] text-white px-4 py-2 rounded-lg hover:bg-[#bf8c13] transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
          <UserCircle className="w-6 h-6" />
          <span className="font-medium">
            {user?.firstName} {user?.lastName}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-2">
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-medium">{user?.email}</p>
            <p className="text-xs text-gray-500">Grade {user?.grade}</p>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
          >
            <User className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
