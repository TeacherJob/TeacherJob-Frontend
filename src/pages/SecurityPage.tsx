// src/pages/SecurityPage.tsx

import React from "react";
import Header from "@/components/Header"; // Adjust path if needed
import Footer from "@/components/Footer"; // Adjust path if needed
import { ShieldCheck, Lock, Database } from "lucide-react";

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

const SecurityPage = () => {
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
              Security at TeacherJob
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Your trust and data security are our top priority.
            </p>
          </div>
        </div>

        {/* Page Content */}
        <div className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <ContentSection icon={<Lock size={22} />} title="Data Encryption">
                <p>
                  All data transmitted between your browser and our servers is
                  encrypted using industry-standard TLS (Transport Layer
                  Security). Your sensitive information, like passwords, is
                  hashed using strong, one-way algorithms.
                </p>
              </ContentSection>

              <ContentSection
                icon={<ShieldCheck size={22} />}
                title="Account Protection"
              >
                <p>
                  We provide robust mechanisms to protect your account. We
                  encourage all users to use strong, unique passwords and offer
                  features to prevent unauthorized access.
                </p>
              </ContentSection>

              <ContentSection
                icon={<Database size={22} />}
                title="Secure Infrastructure"
              >
                <p>
                  Our platform is hosted on a world-class cloud infrastructure
                  that provides a secure, reliable, and scalable environment. We
                  regularly apply security patches and monitor our systems.
                </p>
              </ContentSection>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>Last updated: October 26, 2023</p>
                <p>
                  If you have security concerns, please contact us at{" "}
                  <a
                    href="mailto:security@TeacherJob.com"
                    className="text-primary font-medium hover:underline"
                  >
                    security@TeacherJob.com
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

export default SecurityPage;
