// src/pages/AboutPage.tsx

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Gem, Target, Users, Quote } from "lucide-react";

// Reusable card for core principles
const PrincipleCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
    <div className="flex items-center mb-5">
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

// Reusable stat item
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-4xl lg:text-5xl font-extrabold text-orange-400 drop-shadow-md">
      {value}
    </p>
    <p className="mt-2 text-lg text-indigo-200 tracking-wide">{label}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
              alt="Office background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              We're Changing How Education Hires.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-200">
              Our mission is to build a world where every school has access to
              great teachers, and every teacher finds a place to shine.
            </p>
          </div>
        </section>

        {/* --- OUR STORY SECTION --- */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-6">
                  Our Story: A Passion for Education
                </h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    TeacherConnect started not in a boardroom, but from a shared
                    passion for education. We saw dedicated teachers searching
                    for the right opportunities and visionary schools struggling
                    to find them. We knew there had to be a better way.
                  </p>
                  <p>
                    Driven by technology and a deep understanding of the
                    education sector, we created a platform that is more than
                    just a job board—it's a community. A place for connection,
                    growth, and building the future of learning, one successful
                    hire at a time.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  alt="A team planning on a glass wall"
                  className="rounded-2xl shadow-2xl w-full max-w-md h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- CORE PRINCIPLES (MISSION, VISION, QUALITY) --- */}
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Our Core Principles
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                These values guide every decision we make.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <PrincipleCard icon={<Target size={28} />} title="Our Mission">
                To empower educational institutions and teachers by creating the
                most efficient, transparent, and supportive hiring ecosystem.
              </PrincipleCard>
              <PrincipleCard icon={<Eye size={28} />} title="Our Vision">
                To be the definitive platform where every great educator finds
                their ideal role, shaping the future of learning globally.
              </PrincipleCard>
              <PrincipleCard
                icon={<Gem size={28} />}
                title="Commitment to Quality"
              >
                We uphold the highest standards of integrity, verifying profiles
                and listings to ensure a trustworthy and safe environment for
                all members.
              </PrincipleCard>
            </div>
          </div>
        </section>

        {/* --- OUR IMPACT IN NUMBERS --- */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-blue-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <StatItem value="10,000+" label="Active Teachers" />
              <StatItem value="1,500+" label="Partner Schools" />
              <StatItem value="98%" label="Satisfaction Rate" />
            </div>
          </div>
        </section>

        {/* --- TESTIMONIAL SECTION HAS BEEN REMOVED --- */}

        {/* --- FINAL CTA SECTION --- */}
        <section className="bg-slate-50">
          <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              <span className="block">Ready to Shape the Future?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600">
              Join our community of forward-thinking educators and institutions
              today.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 font-bold px-10 py-4 text-lg"
              >
                <Link to="/browse-jobs">Explore Open Roles</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
