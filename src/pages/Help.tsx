// src/pages/Help.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Mail, Phone, ChevronDown, HelpCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Using a consistent placeholder image URL
const bannerImage =
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2190&auto=format&fit=crop";

// --- DUMMY DATA FOR FAQs ---
const faqData = [
  {
    category: "Account Management",
    questions: [
      {
        q: "How do I reset or change my account password?",
        a: 'Go to the login page and click on "Forgot Password". You\'ll receive a reset link on your registered email. Follow the instructions to set a new password securely.',
      },
      {
        q: "How do I update my email or phone number?",
        a: 'Login to your account, visit the "Profile Settings" section, and click "Edit". You can update your contact information and save changes instantly.',
      },
      {
        q: "How do I delete or deactivate my account?",
        a: "Please write to our support team at support@teacherjob.in with your request. We'll verify your identity and process your request within 48 hours.",
      },
    ],
  },
  {
    category: "Applying for Jobs",
    questions: [
      {
        q: "Where can I track my job applications?",
        a: "Go to \"My Applications\" under your dashboard. You'll see the status of every job you've applied for.",
      },
      {
        q: "What should I expect after applying for a job?",
        a: "We verify your application, forward it to the employer, and notify you when you're shortlisted. Be ready for screening calls or demo requests.",
      },
      {
        q: "Can I apply for multiple jobs at once?",
        a: "Yes! You can apply for multiple relevant roles. We recommend customizing your resume for each application.",
      },
      {
        q: "Can I cancel or withdraw an application?",
        a: 'Yes. In "My Applications", click "Withdraw" next to any job you no longer wish to pursue.',
      },
      {
        q: "How long does it take to hear back?",
        a: "Typically, employers respond within 7-10 days. Our team also follows up on your behalf.",
      },
    ],
  },
  {
    category: "Profile & CV",
    questions: [
      {
        q: "How do I upload or replace my CV/resume?",
        a: 'Go to your profile and click on the "Upload CV" button. Choose your file and hit upload. Only PDF or DOCX formats under 5MB are accepted.',
      },
      {
        q: "What should I include in my profile to get noticed faster?",
        a: "Add your teaching subjects, classes you're comfortable teaching, experience, certifications, and a short introduction. A profile picture adds more trust!",
      },
      {
        q: "Can I hide my profile from certain schools or institutions?",
        a: 'Yes, enable "Private Mode" from your account settings to limit visibility. You can also blacklist institutions if needed.',
      },
      {
        q: "How do I add certifications, experience, or skills?",
        a: 'In your profile editor, use the "Add Certification" and "Add Experience" sections to highlight your professional achievements.',
      },
      {
        q: "How often should I update my profile or resume?",
        a: "We recommend updating your profile every 2-3 months or whenever you gain new skills or experience.",
      },
    ],
  },
  {
    category: "Job Matching & Offers",
    questions: [
      {
        q: "How does the job matching process work?",
        a: "We match your qualifications, experience, and preferences with job openings across India. You'll be notified when a suitable opportunity is available.",
      },
      {
        q: "Who selects the candidate — you or the school?",
        a: "The school or institution takes the final hiring decision. We shortlist and recommend the best candidates for them to review.",
      },
      {
        q: "What if I get multiple job offers?",
        a: "You can choose the offer that best suits you. We'll help coordinate joining with your selected institution.",
      },
      {
        q: "Can I reject a job offer?",
        a: "Yes. You are free to decline any offer before accepting. However, frequent rejections without valid reasons may affect your profile rating.",
      },
      {
        q: "Can I re-apply if I\'m rejected?",
        a: "Absolutely! Many employers review profiles again for new openings.",
      },
    ],
  },
  {
    category: "For Employers",
    questions: [
      {
        q: "How do I post a job on TeacherJob.in?",
        a: 'Register as an employer, visit your dashboard, and click "Post a Job". Fill in the required details and submit.',
      },
      {
        q: "Can I filter candidates by subject, experience, or location?",
        a: "Yes. Our filters allow you to search by subject, experience level, city, state, and even teaching medium.",
      },
      {
        q: "How do I schedule interviews with shortlisted candidates?",
        a: "Use the integrated calendar tool to propose dates. Our team will coordinate with the candidates for you.",
      },
      {
        q: "What if the teacher doesn\'t join after selection?",
        a: "We offer a 6-month job security guarantee. We'll replace the candidate at no additional cost.",
      },
      {
        q: "Do I have to pay to post jobs?",
        a: "No, job posting is completely free. We only charge when a candidate joins and receives their first salary.",
      },
    ],
  },
  {
    category: "Safety, Security & Verification",
    questions: [
      {
        q: "Is my personal data safe on TeacherJob.in?",
        a: "Yes. We use advanced security protocols and do not share your data with third parties without your consent.",
      },
      {
        q: "Are all employers and candidates verified?",
        a: "We perform strict verification through IDs, GST/School code, and interviews before activating accounts.",
      },
      {
        q: "How can I report fraud or misuse?",
        a: 'Use the "Report Abuse" button or contact us at support@teacherjob.in. We take quick action.',
      },
    ],
  },
  {
    category: "Payments & Charges",
    questions: [
      {
        q: "Do teachers or support staff have to pay anything?",
        a: "No upfront fees at all. We charge only after your first salary is received.",
      },
      {
        q: "How do I pay the service fee?",
        a: "Via UPI, bank transfer, or automatic debit. You'll receive instructions once selected.",
      },
      {
        q: "Will I get a receipt or payment invoice?",
        a: "Yes, a GST-compliant invoice is automatically shared with your registered email.",
      },
    ],
  },
  {
    category: "Support & Assistance",
    questions: [
      {
        q: "How can I reach the TeacherJob.in team?",
        a: 'You can reach us through the Help Center, email, WhatsApp, or call. All details are available on our "Contact Us" page.',
      },
      {
        q: "What are the support hours?",
        a: "We're available Monday to Saturday, 9 AM to 9 PM.",
      },
      {
        q: "Can I get personal support in choosing jobs or candidates?",
        a: "Yes. Our relationship managers provide one-to-one assistance.",
      },
    ],
  },
  {
    category: "Training & Career Support",
    questions: [
      {
        q: "Do you help with interview preparation?",
        a: "Yes. We offer demo class guidance, mock interviews, and personalized tips to help you perform your best.",
      },
      {
        q: "Can I get help writing or improving my resume?",
        a: "Absolutely. Our experts can assist you in building an attractive and professional resume.",
      },
      {
        q: "Do you offer skill-building or certification courses?",
        a: "Yes. We are launching verified teaching certifications and workshops soon. Stay tuned!",
      },
    ],
  },
];

const FaqAccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-500 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 px-2 text-gray-600 leading-relaxed">{answer}</div>
      )}
    </div>
  );
};

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqData = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Helmet>
        <title>Help Center | Teaching Jobs & Hiring FAQs | TeacherJob.in</title>
        <meta
          name="description"
          content="Get answers to all your questions about applying, hiring, interview support, and platform policies."
        />
      </Helmet>
      <Header />

      <main className="flex-grow">
        {/* --- Hero Banner Section with Background Image and Gradient --- */}
        <div className="relative text-white overflow-hidden">
          <img
            src={bannerImage}
            alt="Support team assisting a client"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 via-purple-700/70 to-fuchsia-600/80"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Help Center
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Find answers to your questions and get the support you need.
            </p>
            {/* Search Bar */}
            <div className="mt-8 max-w-lg mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for a question..."
                  className="block w-full text-black h-12 pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-white bg-opacity-90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="space-y-10">
            {filteredFaqData.length > 0 ? (
              filteredFaqData.map((category) => (
                <div key={category.category}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {category.category}
                  </h2>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    {category.questions.map((q, index) => (
                      <FaqAccordionItem
                        key={index}
                        question={q.q}
                        answer={q.a}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-white border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800">
                  No results found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try a different search term or check out our contact options
                  below.
                </p>
              </div>
            )}
          </div>

          {/* Contact Us Section */}
          <div className="mt-20 text-center border-t border-gray-200 pt-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Still need help?
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              If you can't find the answer you're looking for, please feel free
              to reach out to our support team.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Mail size={32} className="mx-auto text-indigo-600" />
                <h3 className="mt-4 text-xl font-semibold">Email Support</h3>
                <p className="mt-2 text-gray-500">
                  Send us an email and we'll get back to you soon.
                </p>
                <a
                  href="mailto:support@teacherjob.in"
                  className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
                >
                  support@teacherjob.in
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <Phone size={32} className="mx-auto text-indigo-600" />
                <h3 className="mt-4 text-xl font-semibold">Phone Support</h3>
                <p className="mt-2 text-gray-500">
                  Talk to our team for immediate assistance.
                </p>
                <a
                  href="tel:+919917587294"
                  className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
                >
                  +91 9917587294
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default Help;
