// File: src/components/EmployerHeader.tsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png"; // Logo import is correct

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
      <header className="bg-white text-black sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 -ml-6">
            {/* Logo on the left */}
            <div className="flex-shrink-0 -ml-10">
              <Link to="/">
                <img
                  src={logo}
                  alt="TeacherJob Logo"
                  className="h-[240px] w-auto"
                />
              </Link>
            </div>

            {/* [CHANGED] Desktop Navigation is now in the center */}
            <nav className="hidden md:flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  // [CHANGED] Text is now bold and styling is updated
                  className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${
                    currentPath === link.href
                      ? "text-black bg-gray-100"
                      : "text-gray-500 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* "For Jobseekers" link on the right */}
            <div className="hidden md:flex items-center">
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 hover:text-black"
              >
                For Jobseekers
              </Link>
            </div>

            {/* Mobile Menu Button - remains on the right */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 hover:text-black p-2"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Styles updated for consistency */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center pt-16">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                // [CHANGED] Mobile text is now also bold
                className={`text-2xl font-bold rounded-full transition-colors ${
                  currentPath === link.href
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="w-24 border-gray-200 my-4" />
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-gray-600 hover:text-black"
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
