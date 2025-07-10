// src/components/Footer.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              For Employee
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
                  to="/signup"
                  className="hover:text-white transition-colors"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/salary-guide"
                  className="hover:text-white transition-colors"
                >
                  Earning insights
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
              <li>
                <Link
                  to="/browse-jobs"
                  className="hover:text-white transition-colors"
                >
                  Browse jobs
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              For Employers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/post-job"
                  className="hover:text-white transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
{/*               Institution */}
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
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
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

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61578169764266" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              {/* <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a> */}
              <a 
                href="https://www.linkedin.com/company/teacherjob-in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/teacherjob.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

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
