// src/pages/TermsPage.tsx

import React from "react";
import Header from "@/components/Header"; // Adjust path if needed
import Footer from "@/components/Footer"; // Adjust path if needed
import { FileText, UserCheck, Ban, BrainCircuit } from "lucide-react";

// Reusable Content Section
const ContentSection = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-10">
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-4">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="pl-14 text-gray-700 leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow">
        {/* --- MODIFICATION START --- */}
        {/* Using a brighter, more consistent gradient for better readability */}
        <div className="bg-gradient-to-br from-primary to-blue-800 text-white py-16 sm:py-20">
          {/* --- MODIFICATION END --- */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Please read these terms carefully before using our platform.
            </p>
          </div>
        </div>

        {/* Page Content */}
        <div className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <ContentSection
                icon={<UserCheck size={22} />}
                title="1. Your Account"
              >
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account and password. You agree to accept responsibility
                  for all activities that occur under your account.
                </p>
              </ContentSection>

              <ContentSection
                icon={<Ban size={22} />}
                title="2. Prohibited Activities"
              >
                <p>
                  You are prohibited from using the service to post any unlawful
                  material. You may not use the platform for any purpose that is
                  illegal or prohibited by these terms.
                </p>
              </ContentSection>

              <ContentSection
                icon={<BrainCircuit size={22} />}
                title="3. Intellectual Property"
              >
                <p>
                  All content included on the site is the property of TeacherJob
                  or its suppliers and protected by copyright laws.
                </p>
              </ContentSection>

              <ContentSection
                icon={<FileText size={22} />}
                title="4. Disclaimer of Warranties"
              >
                <p>
                  The service is provided on an "as is" and "as available"
                  basis. TeacherJob makes no warranties, expressed or implied.
                </p>
              </ContentSection>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>Last updated: October 26, 2023</p>
                <p>
                  If you have questions about these Terms, please contact us at{" "}
                  <a
                    href="mailto:legal@TeacherJob.com"
                    className="text-primary font-medium hover:underline"
                  >
                    legal@teacherjob.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
