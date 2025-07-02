// src/components/Footer.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png"; // Assuming your logo path is correct

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Top section with links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: For Candidates */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              For Candidates
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/browse-jobs"
                  className="hover:text-white transition-colors"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition-colors"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/career-guide"
                  className="hover:text-white transition-colors"
                >
                  Career Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: For Employers */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              For Employers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/salary-guide"
                  className="hover:text-white transition-colors"
                >
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/browse-jobs"
                  className="hover:text-white transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/career-guide"
                  className="hover:text-white transition-colors"
                >
                  Career Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section with legal info */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p className="font-semibold text-gray-200">
            © 2025 TeacherJob.in — A Brand by MentisGate Learning Private
            Limited
          </p>
          <p className="mt-4">
            A Government of India registered private limited company under the
            Companies Act, 2013
          </p>
          <p className="mt-1">
            <span className="font-semibold">CIN:</span> U78300UT2025PTC019251
          </p>
          <div className="mt-4">
            <p>
              <span className="font-semibold">Registered Office:</span> C/O
              Harish Kumar, Oasis City Bagwara, Rudrapur, Kichha,
            </p>
            <p>Udham Singh Nagar – 263153, Uttarakhand</p>
          </div>
          <p className="mt-4">
            Incorporated under the Ministry of Corporate Affairs, Government of
            India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
