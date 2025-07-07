// src/pages/TermsPage.tsx

import React from "react";
import Header from "@/components/Header"; // Adjust path if needed
import Footer from "@/components/Footer"; // Adjust path if needed
import {
  FileText,
  UserCheck,
  ShieldCheck,
  Coins,
  RefreshCw,
  AlertTriangle,
  ClipboardCheck,
  Scale,
  Building,
  Gavel,
  CheckSquare,
} from "lucide-react";

// Reusable Content Section for detailed points
const ContentSection = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-10 last:mb-0">
    <div className="flex items-start">
      <div className="flex-shrink-0 w-11 h-11 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-5 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="mt-2 text-gray-700 leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  </section>
);

// Special component for highlighting critical legal clauses
const LegalHighlight = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="my-10 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
    <div className="flex items-center mb-3">
      <AlertTriangle className="h-6 w-6 text-amber-600 mr-3" />
      <h4 className="text-lg font-bold text-amber-800">{title}</h4>
    </div>
    <div className="pl-9 text-amber-900 space-y-3 text-sm leading-6">
      {children}
    </div>
  </div>
);

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-primary to-blue-800 text-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Terms and Conditions
            </h1>
            <p className="mt-4 text-xl text-blue-100">
              Our legal agreement for a transparent and trusted partnership.
            </p>
          </div>
        </div>

        {/* Page Content */}
        <div className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <p className="text-center text-gray-600 mb-12">
                By creating an account on TeacherJob.in, you acknowledge and
                agree to be legally bound by the following terms. These terms
                govern your use of our platform and services provided by{" "}
                <strong>MentisGate Learning Pvt. Ltd.</strong>
              </p>

              {/* === Section for Teachers === */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-primary">
                  For Teachers
                </h2>

                <ContentSection
                  icon={<CheckSquare size={24} />}
                  title="1. Acceptance of Terms"
                >
                  <p>
                    By creating a profile on TeacherJob.in, you agree to these
                    Terms and Conditions. If you do not agree, you must not
                    register or use our services.
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<UserCheck size={24} />}
                  title="2. Account and Profile Accuracy"
                >
                  <p>
                    You are solely responsible for all activities under your
                    account. All information provided in your profile, resume,
                    and documents must be accurate, truthful, and up-to-date.
                    Misrepresentation can lead to account termination.
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<ClipboardCheck size={24} />}
                  title="3. Verification and Interviews"
                >
                  <p>
                    You consent to our team conducting resume verification,
                    screening interviews, and background checks as a part of the
                    standard hiring process.
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<Coins size={24} />}
                  title="4. Placement Charges"
                >
                  <p>
                    MentisGate Learning charges a one-time placement fee
                    equivalent to{" "}
                    <strong>50% of your first month's gross salary</strong>.
                    This fee may be deducted by the hiring school from your
                    salary or paid directly by you. All payments are transparent
                    and include a GST invoice.
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<ShieldCheck size={24} />}
                  title="5. Job Security and Support"
                >
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    <li>
                      <strong>Job Security:</strong> You receive a six-month job
                      security guarantee. If an employer removes you without a
                      valid reason within this period, we will provide another
                      verified job opportunity within 30-60 days, subject to
                      availability.
                    </li>
                    <li>
                      <strong>Dedicated Support:</strong> You are entitled to
                      one year of dedicated support for any workplace issues,
                      such as salary disputes, employer misconduct, or
                      complaints about working conditions.
                    </li>
                  </ul>
                </ContentSection>

                <LegalHighlight title="Important: Non-Circumvention and Indirect Engagement Clause">
                  <p>
                    By using our platform, you agree that once an introduction
                    to a school/institution is made through TeacherJob.in:
                  </p>
                  <ul className="list-decimal list-outside pl-5 space-y-2 font-medium">
                    <li>
                      If you reject or decline an offer or interview from that
                      institution, you are prohibited from contacting, engaging
                      with, or joining the same institution directly or
                      indirectly for a period of <strong>12 months</strong> from
                      the date of rejection.
                    </li>
                    <li>
                      Any engagement must be routed again through TeacherJob.in.
                      Bypassing our platform constitutes a breach of contract
                      under the Indian Contract Act, 1872.
                    </li>
                    <li>
                      In case of a breach, MentisGate Learning Pvt. Ltd.
                      reserves the right to initiate legal proceedings to claim
                      the full placement fee, damages for business loss, and
                      blacklist your profile.
                    </li>
                  </ul>
                </LegalHighlight>
              </div>

              {/* === Section for Employers / Schools === */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-primary">
                  For Employers / Schools
                </h2>

                <ContentSection
                  icon={<Building size={24} />}
                  title="1. Job Postings and Guidelines"
                >
                  <p>
                    You may post job vacancies with accurate role descriptions,
                    salary details, and school information. Misleading,
                    discriminatory, or false listings are strictly prohibited.
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<Coins size={24} />}
                  title="2. Service Fees and Payment"
                >
                  <p>
                    You agree to pay a service fee of{" "}
                    <strong>
                      50% of the hired teacher's first-month gross salary
                    </strong>{" "}
                    to MentisGate Learning. This can be paid directly via
                    invoice or deducted from the teacher's salary with their
                    consent. All transactions are GST-compliant.
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<RefreshCw size={24} />}
                  title="3. Free Replacement Guarantee"
                >
                  <p>
                    If a teacher hired through our platform resigns or is
                    terminated (for non-disciplinary reasons) within the first{" "}
                    <strong>six months</strong> of joining, we will provide one
                    free replacement candidate within a reasonable timeframe
                    (typically up to 60 days).
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<ShieldCheck size={24} />}
                  title="4. Platform Integrity"
                >
                  <p>
                    You must not attempt to bypass the platform to hire
                    candidates introduced by us, withhold due payments, or
                    provide false feedback. Violations can lead to account
                    suspension and legal action for breach of contract.
                  </p>
                </ContentSection>

                <LegalHighlight title="Important: Non-Circumvention and Candidate Engagement Clause">
                  <p>
                    As an institution registered on TeacherJob.in, you agree to
                    the following legally binding condition:
                  </p>
                  <ul className="list-decimal list-outside pl-5 space-y-2 font-medium">
                    <li>
                      You shall not engage, hire, or employ any teacher whose
                      profile was accessed through our platform unless the
                      hiring is processed via TeacherJob.in and the service fee
                      is paid.
                    </li>
                    <li>
                      This prohibition lasts for <strong>12 months</strong> from
                      the date of initial access, even if the candidate was
                      initially rejected by you or contacted you independently
                      later.
                    </li>
                    <li>
                      Any attempt to circumvent our platform is a material
                      breach of this agreement. In such an event, we are
                      entitled to recover the applicable service fee, seek
                      damages for business loss, and suspend your platform
                      access.
                    </li>
                  </ul>
                </LegalHighlight>
              </div>

              {/* === General Section === */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-primary">
                  General & Legal Provisions
                </h2>
                <ContentSection
                  icon={<FileText size={24} />}
                  title="Intellectual Property"
                >
                  <p>
                    All platform content, branding, candidate data, and
                    processes are the exclusive intellectual property of
                    MentisGate Learning Pvt. Ltd., protected under the
                    Information Technology Act, 2000, and other relevant Indian
                    laws.
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<Gavel size={24} />}
                  title="Termination of Account"
                >
                  <p>
                    We reserve the right to suspend or terminate any account
                    found in breach of these terms, engaging in misconduct, or
                    providing false information, without prior notice.
                  </p>
                </ContentSection>

                <ContentSection
                  icon={<Scale size={24} />}
                  title="Dispute Resolution & Governing Law"
                >
                  <p>
                    These terms are governed by the laws of India. Any disputes
                    arising from our services shall first be resolved amicably.
                    If unresolved, they shall be subject to exclusive
                    arbitration in <strong>Rudrapur, Uttarakhand</strong>.
                  </p>
                </ContentSection>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
{/*                 <p>Last updated: October 27, 2023</p> */}
                <p className="mt-2">
                  For any questions regarding these Terms and Conditions, please
                  contact our legal team at{" "}
                  <a
                    href="mailto:legal@teacherjob.com"
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
