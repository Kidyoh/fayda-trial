"use client";
import React from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { NavAuth } from "@/components/atoms/NavAuth";
import { LanguageSwitcher } from "@/components/atoms/LanguageSwitcher";
import { CartIcon } from "@/components/cart/CartIcon";
import { useUIStore } from "@/store/uiStore";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { isNavbarOpen, setNavbarOpen } = useUIStore();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#c7cc3f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Fayida Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/courses_list"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Courses
            </Link>
            <Link
              href="/packages_list"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Packages
            </Link>
            <Link
              href="/competitions"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Competitions
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              About
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="w-4 h-4" />
            </Button>

            {/* Cart */}
            <CartIcon />

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Auth */}
            <NavAuth />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setNavbarOpen(!isNavbarOpen)}
            >
              {isNavbarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isNavbarOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/courses_list"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setNavbarOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/packages_list"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setNavbarOpen(false)}
              >
                Packages
              </Link>
              <Link
                href="/competitions"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setNavbarOpen(false)}
              >
                Competitions
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setNavbarOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
