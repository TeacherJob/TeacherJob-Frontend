// File: src/components/EmployerHeader.tsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png"; // Assuming logo has a transparent background

const navLinks = [
  { href: "/post-job", label: "Post a Job" },
  { href: "/products", label: "Products" },
  { href: "/resources", label: "Resources" },
];

const EmployerHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* [MODIFIED] Changed background to white, text to black, and added border/shadow */}
      <header className="bg-white text-gray-900 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/">
                {/* [MODIFIED] Adjusted logo size for a standard header height */}
                <img
                  src={logo}
                  alt="TeacherJob Logo"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  // [MODIFIED] Updated link styles for light theme
                  className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    currentPath === link.href
                      ? "font-semibold text-primary bg-primary/10"
                      : "font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center">
              {/* [MODIFIED] Updated link style for light theme */}
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                For Jobseekers
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              {/* [MODIFIED] Updated button color */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        // [MODIFIED] Changed overlay to white background
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center pt-20">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                // [MODIFIED] Updated text colors for light theme
                className={`text-2xl transition-colors ${
                  currentPath === link.href
                    ? "font-bold text-primary"
                    : "font-medium text-gray-700 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="w-24 border-gray-200 my-4" />
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              // [MODIFIED] Updated text colors for light theme
              className="text-lg font-medium text-gray-600 hover:text-gray-900"
            >
              For Jobseekers
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default EmployerHeader;
