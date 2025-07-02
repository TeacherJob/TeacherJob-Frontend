import React from "react";
import { Link } from "react-router-dom";
import {
  Check,
  CheckCircle,
  LayoutDashboard,
  BookOpen, // Added icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import EmployerHeader from "@/components/EmployerHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

// --- Reusable Feature Card Component ---
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200/80 text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// --- Reusable Form Field Component ---
const FormField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  required = true,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  children?: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label htmlFor={name} className="font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    {children || (
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

// --- Data for the Feature Table ---
const hiringFeatures = [
  "Free Job Posts",
  "Resume Filtering",
  "Screening Round",
  "Interview Coordination",
  "Hiring Support 24x7",
  "Dedicated Account Manager",
  "Document Handling Support",
  "Joining Ticket Follow-up",
  "No HR Needed – We Handle It",
];

// --- Main Products Page Component ---
const Products = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      <EmployerHeader />

      <main>
        {/* --- HERO SECTION --- */}
        <section
          className="relative bg-cover bg-center text-white pt-24 pb-24 sm:pt-32 sm:pb-32"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-orange-500 bg-opacity-75"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-6 inline-block bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
                Employer Resource Library
              </h1>
              <p className="mt-6 text-xl text-gray-100 max-w-3xl mx-auto drop-shadow">
                Hiring made simple. Learn more about tools, hiring with
                TeacherJob, trends, and more. It's all here in our resource
                center.
              </p>
            </div>
          </div>
        </section>

        {/* --- CORE FEATURES SECTION --- */}
        <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                A Better Way to Hire
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                TeacherJob gives you the tools you need to go from job post to
                hire, faster.
              </p>
            </div>
            <div className="space-y-20">
              {/* Feature 1: Free Job Post */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    Start with a Free Job Post
                  </h3>
                  <div className="mt-4 text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>
                      <strong className="text-primary">
                        🎓 Post for any role
                      </strong>{" "}
                      — TGT, PGT, PRT, Professors, Non-teaching Staff, Coaches,
                      and more.
                    </p>
                    <p>
                      <strong className="text-primary">
                        📝 Use ready-made job templates
                      </strong>{" "}
                      built for the education industry to attract the right
                      candidates.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl border">
                  <div className="bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">
                    Example
                  </div>
                  <div className="bg-white p-6 rounded-xl border space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-500">
                        Subject:
                      </span>
                      <span className="font-bold text-gray-800">
                        English / Physics / Computer Science
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-500">Type:</span>
                      <span className="font-bold text-gray-800">
                        Full-time / Part-time
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-500">
                        Experience:
                      </span>
                      <span className="font-bold text-gray-800">
                        0–10+ Years
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-500">
                        Level:
                      </span>
                      <span className="font-bold text-gray-800">
                        School / College / Coaching
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Smart Filtering */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="lg:order-2">
                  <h3 className="text-3xl font-bold text-gray-900">
                    Smart Filtering & Pre-Screening
                  </h3>
                  <div className="mt-4 text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>
                      <strong className="text-primary">
                        We shortlist, you hire.
                      </strong>
                    </p>
                    <p>
                      ⏳ Save hours — we filter and screen resumes based on your
                      preferences: location, salary, subject, experience,
                      language, and more.
                    </p>
                    <ul className="space-y-2 mt-4">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span>Screening round + resume curation included</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span>
                          Only verified and interview-ready candidates
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span>
                          View resumes and schedule interviews from your
                          dashboard
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="lg:order-1">
                  <img
                    src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop"
                    alt="Filtering candidates on a screen"
                    className="rounded-2xl shadow-xl w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Feature 3: End-to-End Hiring */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    End-to-End Hiring — In One Dashboard
                  </h3>
                  <div className="mt-4 text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>
                      From job posting to onboarding — everything you need in
                      one place.
                    </p>
                    <ul className="space-y-3 mt-4">
                      <li className="flex items-start gap-3">
                        <LayoutDashboard className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span>
                          <strong>Post jobs & track candidates</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <LayoutDashboard className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span>
                          <strong>Schedule interviews</strong> with
                          auto-reminders
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <LayoutDashboard className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span>
                          <strong>Offer letter & joining confirmation</strong>{" "}
                          templates
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <LayoutDashboard className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span>
                          <strong>Auto-upload documents</strong> for onboarding
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <LayoutDashboard className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <span>
                          Support in <strong>follow-ups until joining</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                    alt="A team managing a project on a dashboard"
                    className="rounded-2xl shadow-xl w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY EMPLOYERS LOVE US --- */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Why Employers Love Us
              </h2>
            </div>
            <Card className="shadow-2xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-lg font-bold">Feature</TableHead>
                    <TableHead className="text-right text-lg font-bold">
                      Included?
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hiringFeatures.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{feature}</TableCell>
                      <TableCell className="text-right">
                        <Check className="inline-block w-6 h-6 text-green-600" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        {/* --- INSTITUTIONS WE SERVE --- */}
        <section className="py-20 sm:py-24 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Institutions We Serve
                </h2>
                <ul className="space-y-4">
                  {[
                    "K-12 Private & Public Schools",
                    "Colleges & Universities",
                    "Online & Offline Coaching Institutes",
                    "EduTech Platforms",
                    "NGOs and Skill Centers",
                    "Preschools & Playschools",
                    "CBSE, ICSE, State Boards, IB, IGCSE",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:order-first">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
                  alt="A university campus"
                  className="rounded-2xl shadow-xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTACT FORM SECTION --- */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Want to Hire Faster?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Leave your details below. Our team will contact you within 1
                hour.
              </p>
            </div>
            <form className="space-y-6">
              <FormField label="Full Name" name="fullName" />
              <FormField label="Email Address" name="email" type="email" />
              <FormField label="Phone Number" name="phone" type="tel" />
              <FormField label="Company Name" name="companyName" />
              <FormField label="Your Message" name="message" required={false}>
                <Textarea id="message" name="message" rows={4} />
              </FormField>
              <Button
                type="submit"
                size="lg"
                className="w-full font-bold text-lg"
              >
                Submit
              </Button>
            </form>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-extrabold">Ready to Start Hiring?</h2>
            <p className="mt-2 text-xl text-blue-200">
              🎁 Your next great educator is waiting. Post your job today — for
              free.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="font-bold bg-white text-primary rounded-full px-10 py-4 hover:bg-gray-100"
              >
                Post a Job
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
