import React, { useState } from "react";
import {
  CheckCircle,
  Users,
  Search,
  Briefcase,
  Quote,
  X,
  Award, // New Icon
  Target, // New Icon
  Zap, // New Icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import EmployerHeader from "@/components/EmployerHeader"; // Reusable header

// --- Job Post Modal Component ---
// This remains unchanged as it's a core feature
const JobPostModal = ({ onClose }: { onClose: () => void }) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Job submitted successfully! (This is a demo)");
    onClose();
  };
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={handleModalContentClick}
      >
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Post a New Job
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Fill out the details below to find your next great hire.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g., Senior Physics Teacher"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g., New Delhi, India"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="jobType"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Temporary</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                placeholder="Describe the responsibilities, qualifications, and benefits..."
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Post Job</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- FeatureCard Component ---
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// --- NEW STATIC UI SECTION ---
const WhyHireWithUsSection = () => {
  const benefits = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Vast Talent Pool",
      description:
        "Tap into our network of over 10,000+ pre-vetted and active teaching professionals.",
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Precision Matching",
      description:
        "Our AI-powered algorithm connects you with candidates who perfectly fit your requirements.",
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Accelerated Hiring",
      description:
        "Fill vacancies faster. Our streamlined process takes you from posting to hiring in record time.",
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Quality Guaranteed",
      description:
        "We stand by our candidates with a 6-month replacement policy for your peace of mind.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side: Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Smartest Way to Build Your Dream Team
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We provide more than just a job board. We offer a complete hiring
              solution designed to bring the best educational talent to your
              institution.
            </p>
            <div className="space-y-6">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right side: Image */}
          <div className="relative h-full w-full min-h-[450px] hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
              alt="Team collaborating on hiring"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Page Component ---
const PostJob = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <EmployerHeader />

      {/* --- HERO SECTION --- */}
      <section
        className="relative text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side content */}
            <div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-md">
                Let's hire your next great teacher. Fast.
              </h1>
              <p className="text-xl mb-10 text-gray-200 drop-shadow">
                No matter the skills, experience, or qualifications, you'll find
                the right people on TeacherJob.
              </p>
              <Button
                size="lg"
                className="px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg shadow-lg"
                onClick={() => setIsFormOpen(true)}
              >
                Post a Job — It’s Free
              </Button>
              <div className="mt-8 flex items-center gap-x-6 gap-y-3 text-gray-200 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>10,000+ Active Teachers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Fast & Easy Posting</span>
                </div>
              </div>
            </div>
            {/* Right side card */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-3xl transform -rotate-6 translate-x-3 translate-y-3"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col justify-between shadow-2xl h-[420px]">
                  <div>
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-bold text-3xl text-white">
                      Find Top Talent
                    </h3>
                    <p className="text-gray-300 mt-2">
                      Connect with qualified educators.
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl mt-6">
                    <p className="text-sm font-semibold text-white">
                      "A seamless hiring experience."
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-200">
                        Verified Partner
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- "HOW IT WORKS" SECTION --- */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to make great hires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform simplifies the hiring process for educational
              institutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Briefcase className="w-8 h-8 text-primary" />}
              title="1. Post Your Job"
              description="Reach thousands of qualified teachers across India with a single, easy-to-create job post."
            />
            <FeatureCard
              icon={<Search className="w-8 h-8 text-primary" />}
              title="2. Find Quality Candidates"
              description="Our smart matching tools help you identify and connect with the best-matched teachers for your role."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-primary" />}
              title="3. Hire with Confidence"
              description="Make informed decisions with detailed profiles, peer reviews, and our expert guidance."
            />
          </div>
        </div>
      </section>

      {/* --- REPLACEMENT SECTION CALL --- */}
      <WhyHireWithUsSection />

      {/* --- TESTIMONIALS SECTION --- */}
{/*       <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Trusted by Schools Across India
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-white rounded-2xl p-8 sm:p-10 text-center border-t-4 border-primary shadow-2xl">
              <Quote className="absolute top-4 right-4 w-16 h-16 text-gray-100" />
              <img
                className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 border-4 border-white"
                src="https://via.placeholder.com/150"
                alt="avatar"
              />
              <blockquote className="text-xl text-gray-700 my-4 italic">
                "TeacherJob helped us find a qualified Physics PGT in just two
                weeks. The process was seamless and the quality of candidates
                was exceptional."
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">Dr. Rajesh Kumar</p>
                <p className="text-gray-600">Principal, Delhi Public School</p>
              </div>
            </div>
          </div>
        </div>
      </section>
 */}
      {/* --- FINAL CTA SECTION --- */}
      <section className="relative py-20 bg-primary text-white overflow-hidden">
        <div className="absolute -left-16 -top-16 w-48 h-48 border-[16px] border-white/5 rounded-full"></div>
        <div className="absolute -right-16 -bottom-16 w-48 h-48 border-[16px] border-white/5 rounded-full"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to find your next great hire?
          </h2>
          <p className="text-xl mb-8 text-blue-200 max-w-2xl mx-auto">
            Join thousands of schools that trust TeacherJob for their hiring
            needs.
          </p>
          <Button
            size="lg"
            className="px-10 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg shadow-lg"
            onClick={() => setIsFormOpen(true)}
          >
            Post a Job — It’s Free
          </Button>
        </div>
      </section>

      <Footer />

      {isFormOpen && <JobPostModal onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default PostJob;
