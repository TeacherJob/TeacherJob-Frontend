// src/pages/PrivacyPolicy.tsx

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  Users,
  Lock,
  Mail,
  Zap,
  UserCheck,
  Scale,
  Settings,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const img9 =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop";

// --- REUSABLE SECTION COMPONENT for policy content ---
const PolicySection: React.FC<{
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, children }) => (
  <section className="mb-12">
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-lg">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
        {title}
      </h2>
    </div>
    <div className="space-y-4 text-gray-600 leading-relaxed md:pl-16">
      {children}
    </div>
  </section>
);

// --- MAIN PRIVACY & SECURITY PAGE COMPONENT ---
const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <div className="relative text-white overflow-hidden">
          <img
            src={img9}
            alt="Professional work environment"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/70 via-purple-700/60 to-fuchsia-600/70"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28"
          >
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Privacy & Security Policy
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Last Updated: July 1, 2025. Your trust is our top priority.
            </p>
          </motion.div>
        </div>

        {/* --- Policy Content Section --- */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-lg text-gray-600 mb-16 text-center">
            Welcome to TeacherJob.in. This policy explains how we collect, use,
            disclose, and safeguard your information. We are committed to
            providing a safe, secure, and transparent platform. Please read this
            policy carefully.
          </p>

          {/* --- MERGED CONTENT SECTIONS (Privacy + Security) --- */}

          <PolicySection icon={FileText} title="Information We Collect">
            <p>
              We may collect information about you in a variety of ways. The
              information we may collect on the Site includes:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Personal Data:</strong> Personally identifiable
                information, such as your name, email address, telephone number,
                educational and professional background, that you voluntarily
                give to us when you register or build your profile.
              </li>
              <li>
                <strong>Usage Data:</strong> Information our servers
                automatically collect when you access the Site, such as your IP
                address, browser type, operating system, and the pages you have
                viewed.
              </li>
              <li>
                <strong>Employer Data:</strong> For employers, we collect job
                details and hiring requirements to facilitate the hiring
                process.
              </li>
            </ul>
            <p className="mt-4">
              We never collect sensitive financial data like card numbers or
              personal bank details without your explicit consent for a specific
              transaction.
            </p>
          </PolicySection>

          <PolicySection icon={Zap} title="How We Use Your Information">
            <p>
              Your data is used solely for the purpose of providing and
              improving our services. Specifically, we may use information
              collected about you to:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>Create and manage your account.</li>
              <li>Match you with relevant job or candidate opportunities.</li>
              <li>
                Facilitate interviews and communications between candidates and
                employers.
              </li>
              <li>
                Email you regarding your account, applications, or other
                relevant opportunities.
              </li>
              <li>
                Monitor and analyze usage and trends to improve your experience.
              </li>
              <li>Prevent fraudulent activity and ensure legal compliance.</li>
            </ul>
            <p className="mt-4">
              We do not sell or rent your personal information to any third
              party for marketing purposes.
            </p>
          </PolicySection>

          <PolicySection
            icon={Users}
            title="Disclosure and Sharing of Information"
          >
            <p>
              We may share information we have collected about you in certain,
              controlled situations:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>With Verified Employers:</strong> Candidate profiles are
                shared only with verified employers registered on our platform
                to facilitate job applications.
              </li>
              <li>
                <strong>With Shortlisted Candidates:</strong> Employers’ contact
                details are not public and are only shared with candidates they
                choose to shortlist for a position.
              </li>
              <li>
                <strong>By Law or to Protect Rights:</strong> If we believe the
                release of information is necessary to respond to legal process,
                investigate potential violations of our policies, or protect the
                rights, property, and safety of others.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> We may share
                your information with third parties that perform services for
                us, such as data analysis, email delivery, and cloud hosting.
              </li>
            </ul>
          </PolicySection>

          <PolicySection icon={Lock} title="Data Security Commitment">
            <p>
              We use industry-standard technologies and administrative
              safeguards to keep your information safe:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>SSL Encryption</strong> to protect data transmitted
                between your browser and our servers.
              </li>
              <li>
                <strong>Secure Authentication</strong> using OTPs and securely
                hashed passwords.
              </li>
              <li>
                <strong>Firewalls & Intrusion Detection Systems</strong> to
                prevent unauthorized access to our network.
              </li>
              <li>
                <strong>Routine Security Audits</strong> to identify and address
                potential vulnerabilities.
              </li>
            </ul>
          </PolicySection>

          <PolicySection
            icon={UserCheck}
            title="Verification & Fraud Protection"
          >
            <p>
              To maintain a trustworthy ecosystem, we verify every employer and
              candidate through:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                ID and document validation (e.g., Aadhar, PAN, school
                registration).
              </li>
              <li>
                Manual screening and background checks against our records.
              </li>
              <li>Secure messaging and contact controls to prevent spam.</li>
            </ul>
            <p className="mt-4">
              If you spot any suspicious activity or job listing, you can report
              it instantly. We take fraud very seriously and investigate all
              reports promptly.
            </p>
          </PolicySection>

          <PolicySection icon={Settings} title="Your Controls & Rights">
            <p>
              We believe you should have control over your data. You can at any
              time:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>
                Access, update, or delete your account and personal information
                through your profile settings.
              </li>
              <li>Download a copy of your data for your records.</li>
              <li>Opt-out of non-essential communications or data sharing.</li>
              <li>
                Contact our Grievance Officer for any legal, ethical, or privacy
                concerns.
              </li>
            </ul>
          </PolicySection>

          <PolicySection icon={Scale} title="Legal Compliance">
            <p>
              TeacherJob.in is owned by MentisGate Learning Private Limited
              (CIN: U78300UT2025PTC019251) and complies with Indian laws,
              including:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>The Information Technology Act, 2000, and its amendments.</li>
              <li>
                The Information Technology (Reasonable Security Practices and
                Procedures and Sensitive Personal Data or Information) Rules,
                2011.
              </li>
              <li>Best practices under the Companies Act, 2013.</li>
            </ul>
          </PolicySection>

          <PolicySection icon={Mail} title="Contact Us">
            <p>
              If you have questions, comments, or concerns about this Privacy &
              Security Policy, please write to our Grievance Officer:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <p className="font-semibold">Grievance Officer</p>
              <p>MentisGate Learning Pvt. Ltd.</p>
              <a
                href="mailto:support@teacherjob.in"
                className="text-indigo-600 font-semibold hover:underline"
              >
                support@teacherjob.in
              </a>
              <p className="mt-2">
                Oasis City Bagwara, Rudrapur, Kichha, Udham Singh Nagar –
                263153, Uttarakhand
              </p>
            </div>
          </PolicySection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
