// src/components/Index.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "@/features/auth/authSlice";
import { useGetPublicJobsQuery } from "@/features/api/publicJobApiService";
import {
  useApplyToJobMutation,
  useSaveJobMutation,
  useGetMyApplicationsQuery,
} from "@/features/profile/employerProfileApiService";

// lucide-react icons (with one renamed to avoid conflict)
import {
  MapPin,
  Briefcase,
  Clock,
  Check,
  Bookmark,
  Share2,
  Wallet,
  Building,
  ShieldCheck as LucideShieldCheck,
  Loader2,
  ArrowLeft,
} from "lucide-react";
// heroicons for the new sections
import {
  ShieldCheckIcon,
  GiftIcon,
  PhoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import img1 from "@/assets/img1.webp";
import img2 from "@/assets/img2.jpg";
import img3 from "@/assets/img3.jpg";
import img4 from "@/assets/img4.avif";
import img5 from "@/assets/img5.jpg";

// Interface definitions...
interface Job {
  _id: string;
  title: string;
  schoolName: string;
  location: string;
  salary: string;
  type: string;
  experienceLevel: string;
  isUrgent: boolean;
  description: string;
  responsibilities: string;
  requirements: string;
  tags: string[];
}
interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  backgroundVideo?: string;
  backgroundImage?: string;
}
interface Testimonial {
  id: number;
  name: string;
  role: string;
  institution: string;
  content: string;
  rating: number;
  avatar: string;
}

// === SLIDES ARRAY ===
const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Find Your Dream Teaching Job",
    subtitle: "Connect with Excellence",
    description:
      "Connect with top schools and educational institutions. Discover opportunities that match your skills and passion for teaching.",
    primaryButton: { text: "Browse Jobs", href: "/browse-jobs" },
    secondaryButton: { text: "Sign Up Now", href: "/signup" },
    backgroundVideo:
      "https://videos.pexels.com/video-files/3209828/3209828-hd.mp4",
    backgroundImage: img1,
  },
  {
    id: 2,
    title: "Making Headlines in Education",
    subtitle: "In The Spotlight",
    description:
      "We're proud to be featured for our commitment to connecting exceptional educators with top institutions.",
    primaryButton: { text: "Read The Articles", href: "/press" },
    secondaryButton: { text: "About Us", href: "/about" },
    backgroundVideo:
      "https://pixabay.com/videos/library-books-the-corridor-window-846",
    backgroundImage: img2,
  },
  {
    id: 3,
    title: "Shape Young Minds",
    subtitle: "Make a Difference",
    description:
      "Join prestigious educational institutions and be part of shaping the future. Find teaching positions that align with your expertise and values.",
    primaryButton: { text: "Explore Opportunities", href: "/browse-jobs" },
    secondaryButton: { text: "Join Today", href: "/signup" },
    backgroundVideo:
      "https://videos.pexels.com/video-files/855341/855341-hd.mp4",
    backgroundImage: img3,
  },
  {
    id: 4,
    title: "Advance Your Career",
    subtitle: "Grow with Purpose",
    description:
      "Take your teaching career to the next level. Connect with schools and institutes that value professional growth and educational excellence.",
    primaryButton: { text: "View Positions", href: "/browse-jobs" },
    secondaryButton: { text: "Get Started", href: "/signup" },
    backgroundVideo:
      "https://videos.pexels.com/video-files/4434253/4434253-hd.mp4",
    backgroundImage: img4,
  },
  {
    id: 5,
    title: "For Educational Institutions",
    subtitle: "Find Quality Educators",
    description:
      "Post your teaching positions and connect with qualified, passionate educators. Build your team with the best teaching talent available.",
    primaryButton: { text: "Post a Job", href: "/signup" },
    secondaryButton: { text: "Learn More", href: "/" },
    backgroundVideo:
      "https://videos.pexels.com/video-files/5949887/5949887-hd.mp4",
    backgroundImage: img5,
  },
];

// === TESTIMONIALS ARRAY ===
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Mathematics Teacher",
    institution: "Greenwood High School",
    content:
      "This platform helped me find my dream teaching position at an amazing school. The process was smooth and the support team was incredibly helpful throughout my job search journey.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Science Teacher",
    institution: "Riverside Academy",
    content:
      "As a school administrator, I've found exceptional teachers through this portal. The quality of candidates and the easy-to-use interface makes hiring so much more efficient.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "English Literature Teacher",
    institution: "Oakwood International School",
    content:
      "I was able to connect with multiple schools and found a position that perfectly matches my teaching philosophy. The detailed job descriptions really helped me make the right choice.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

// === HERO CAROUSEL ===
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);
  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative overflow-hidden bg-main">
      <div className="relative min-h-[600px] flex items-center justify-center">
        {currentSlideData.backgroundImage && (
          <img
            src={currentSlideData.backgroundImage}
            alt="slide background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            style={{ filter: "brightness(0.85)" }}
          />
        )}
        {currentSlideData.backgroundVideo && (
          <video
            key={currentSlideData.id}
            className="absolute top-0 left-0 w-full h-full object-cover z-10 opacity-40"
            src={currentSlideData.backgroundVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white text-primary font-bold rounded-full text-md">
              {currentSlideData.subtitle}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-white drop-shadow-lg">
            {currentSlideData.title}
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto leading-relaxed text-white drop-shadow">
            {currentSlideData.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={currentSlideData.primaryButton.href}
              className="px-8 py-4 text-base font-medium rounded-full text-white bg-primary hover:opacity-90 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {currentSlideData.primaryButton.text}
            </Link>
            <Link
              to={currentSlideData.secondaryButton.href}
              className="px-8 py-4 border border-primary text-base font-medium rounded-full text-primary bg-white hover:bg-subtle md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
            >
              {currentSlideData.secondaryButton.text}
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-primary scale-125"
                : "bg-primary bg-opacity-40 hover:bg-opacity-70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// === NEW JOB DETAILS ===
const NewJobDetails = ({
  job,
  applicationStatus,
}: {
  job: Job;
  applicationStatus: "applied" | "saved" | null;
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();
  const [saveJob, { isLoading: isSaving }] = useSaveJobMutation();

  const handleAction = async (action: "apply" | "save") => {
    if (!isAuthenticated) {
      toast.error("Please log in to apply for jobs.");
      navigate("/login");
      return;
    }
    if (currentUser && currentUser.role && currentUser.role !== "teacher") {
      toast.error(`Only teachers can ${action} for jobs.`);
      return;
    }

    const mutation = action === "apply" ? applyToJob : saveJob;
    const successMessage =
      action === "apply" ? "Successfully applied!" : "Job saved!";
    const loadingToast = toast.loading(
      `${action === "apply" ? "Applying" : "Saving"}...`
    );
    try {
      await mutation(job._id).unwrap();
      toast.success(successMessage, { id: loadingToast });
    } catch (err: any) {
      toast.error(err.data?.message || `Failed to ${action} for job.`, {
        id: loadingToast,
      });
    }
  };

  const responsibilitiesList =
    typeof job.responsibilities === "string"
      ? job.responsibilities.split("\n").filter((line) => line.trim() !== "")
      : [];
  const requirementsList =
    typeof job.requirements === "string"
      ? job.requirements.split("\n").filter((line) => line.trim() !== "")
      : [];

  const renderActionButtons = () => {
    if (applicationStatus === "applied") {
      return (
        <Button className="w-full" disabled>
          <Check className="w-4 h-4 mr-2" />
          Applied
        </Button>
      );
    }
    if (applicationStatus === "saved") {
      return (
        <Button className="w-full" variant="outline" disabled>
          <Bookmark className="w-4 h-4 mr-2" />
          Saved
        </Button>
      );
    }
    return (
      <Button
        onClick={() => handleAction("apply")}
        disabled={isApplying || isSaving}
        className="w-full bg-primary text-white py-3 px-6 rounded-full hover:bg-opacity-90 transition-colors font-semibold text-md disabled:bg-indigo-400"
      >
        {isApplying ? "Applying..." : "Apply Now"}
      </Button>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <div className="mt-1 flex items-center gap-2 text-gray-600">
              <Building size={16} />
              <p className="text-md font-semibold text-indigo-600">
                {job.schoolName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleAction("save")}
              disabled={isSaving || isApplying || applicationStatus !== null}
              className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <Bookmark size={20} />
            </button>
            <button className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
        <div className="mt-6">{renderActionButtons()}</div>
      </div>
      <div className="px-6 py-4 border-y border-gray-200 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Wallet size={16} className="text-gray-500" />
          <span className="text-sm font-medium">{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-gray-500" />
          <span className="text-sm font-medium">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Briefcase size={16} className="text-gray-500" />
          <span className="text-sm font-medium">{job.type}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm font-medium">{job.experienceLevel}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Full Job Description
        </h3>
        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">About the Role</h4>
            <p>{job.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Key Responsibilities
            </h4>
            <ul className="space-y-1.5 list-disc list-inside">
              {responsibilitiesList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Required Skills and Qualifications
            </h4>
            <ul className="space-y-1.5 list-disc list-inside">
              {requirementsList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// === JOB LIST ITEM ===
const JobListItem = (props: {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
  applicationStatus: "applied" | "saved" | null;
}) => {
  const { job, isSelected, onClick, applicationStatus } = props;
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:border-primary hover:shadow-lg transform hover:-translate-y-1 ${
        isSelected ? "border-primary bg-subtle shadow-md" : "border-subtle"
      }`}
    >
      <div className="p-5 relative">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-main">{job.title}</h3>
            <p className="text-md font-semibold text-secondary mt-1">
              {job.schoolName}
            </p>
          </div>
          {applicationStatus && (
            <Badge
              variant={
                applicationStatus === "applied" ? "default" : "secondary"
              }
            >
              {applicationStatus === "applied" ? "Applied" : "Saved"}
            </Badge>
          )}
        </div>
        <div className="mt-4 space-y-2 text-sm text-secondary">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={14} />
            <span>{job.salary}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {job.tags?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="bg-subtle text-secondary text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// === JOB SEARCH SECTION ===
const JobSearchSection = () => {
  const { data: jobs = [], isLoading, isError } = useGetPublicJobsQuery();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data: myApplications = [] } = useGetMyApplicationsQuery("applied", {
    skip: !isAuthenticated,
  });
  const { data: savedApplications = [] } = useGetMyApplicationsQuery("saved", {
    skip: !isAuthenticated,
  });

  const applicationStatusMap = useMemo(() => {
    const map = new Map<"applied" | "saved", Set<string>>();
    const appliedJobIds = myApplications
      .map((app) => app?.job?._id)
      .filter(Boolean);
    map.set("applied", new Set(appliedJobIds));
    const savedJobIds = savedApplications
      .map((app) => app?.job?._id)
      .filter(Boolean);
    map.set("saved", new Set(savedJobIds));
    return map;
  }, [myApplications, savedApplications]);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "details">("list");

  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0]);
    }
  }, [jobs, selectedJob]);

  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return jobs;
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setMobileView("details");
  };

  const handleBackToList = () => {
    setMobileView("list");
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-lg font-semibold flex items-center justify-center gap-2">
        <Loader2 className="animate-spin" />
        Loading Jobs...
      </div>
    );
  if (isError || !jobs)
    return (
      <div className="text-center py-20 text-lg font-semibold text-red-500">
        Failed to load jobs. Please try again later.
      </div>
    );

  const getJobApplicationStatus = (jobId: string) => {
    if (applicationStatusMap.get("applied")?.has(jobId)) return "applied";
    if (applicationStatusMap.get("saved")?.has(jobId)) return "saved";
    return null;
  };

  return (
    <section id="jobs" className="bg-slate-50 border-y border-gray-200">
      <div className="max-w-screen-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Find Your Next Opportunity
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore thousands of teaching jobs from top institutions.
          </p>
          <div className="mt-8 max-w-lg mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search job title or school..."
              className="w-full h-12 px-5 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary outline-none text-base shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          {/* Job List Pane */}
          <div
            className={`lg:col-span-5 xl:col-span-4 space-y-4 h-[60vh] overflow-y-auto lg:h-[calc(100vh-200px)] pr-4 custom-scrollbar ${
              mobileView === "list" ? "block" : "hidden"
            } lg:block`}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobListItem
                  key={job._id}
                  job={job}
                  isSelected={selectedJob?._id === job._id}
                  onClick={() => handleJobSelect(job)}
                  applicationStatus={getJobApplicationStatus(job._id)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                No jobs found at the moment.
              </p>
            )}
          </div>

          {/* Job Details Pane */}
          <div
            className={`lg:col-span-7 xl:col-span-8 h-[60vh] overflow-y-auto lg:h-[calc(100vh-200px)] pr-2 custom-scrollbar ${
              mobileView === "details" ? "block" : "hidden"
            } lg:block`}
          >
            {/* Back Button for mobile view */}
            <Button
              variant="outline"
              onClick={handleBackToList}
              className="mb-4 lg:hidden flex items-center sticky top-0 bg-slate-50 z-10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Job List
            </Button>

            {selectedJob ? (
              <NewJobDetails
                job={selectedJob}
                applicationStatus={getJobApplicationStatus(selectedJob._id)}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">Select a job to see details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// === START: UPDATED HowWeWork COMPONENT WITH UI FIXES ===
const HowWeWork = () => (
  <section className="w-full bg-white overflow-hidden">
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-16">
        {/* Content on the Left */}
        <div className="text-left lg:col-span-7">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            How We Empower Your Career
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            We support every role that powers education. At TeacherJob.in, we
            help individuals from all educational roles — school teachers,
            college professors, coaching faculty, and non-teaching staff like
            office assistants, drivers, lab technicians, librarians, cooks, and
            support workers — find the right opportunities in trusted
            institutions. Our mission goes beyond placement. We aim to uplift
            every individual involved in education by offering transparent,
            ethical, and performance-based hiring solutions.
          </p>

          <div className="mt-8 space-y-6 text-gray-700">
            <div>
              <strong className="text-gray-900">
                💼 No upfront charges. Ever.
              </strong>
              <p className="mt-1">
                You only pay us after you’re hired and receive your first salary
                — that’s our performance-based promise. This unique model
                ensures our success is directly tied to yours — we grow when you
                do.
              </p>
            </div>
            <div>
              <strong className="text-gray-900">
                🎁 We celebrate your success.
              </strong>
              <p className="mt-1">
                Every successful hire through our platform receives a custom
                welcome gift, along with a 6-month job security period and
                dedicated support from our team for up to 1 year (21x7).
              </p>
            </div>
          </div>

          <p className="mt-8 font-semibold text-gray-800">
            We're more than just a job portal — we're your career partner.
          </p>

          <a
            href="#"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Join as an Employee / Education Professional
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Image on the Right with Badges */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden lg:col-span-5 h-full">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
            alt="Team of educators collaborating"
            className="w-full h-full object-cover min-h-[500px] lg:min-h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>

          {/* Top Right Badge */}
          <div className="absolute top-5 right-5 text-center rounded-full bg-green-500/95 backdrop-blur-sm px-5 py-3 text-sm font-bold text-white shadow-lg">
            💸 No Registration Fee
            <br />
            <span className="font-normal">First Salary, Then We Charge</span>
          </div>

          {/* Bottom Badges - Stacked neatly */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-white/90 backdrop-blur-sm p-3 shadow-xl">
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                6-Month Job Security
                <br />
                Guarantee
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/90 backdrop-blur-sm p-3 shadow-xl">
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <GiftIcon className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                Free Welcome Gift
                <br />
                Upon Joining
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/90 backdrop-blur-sm p-3 shadow-xl">
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <PhoneIcon className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                21x7 Dedicated Support
                <br />
                365 Days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
// === END: UPDATED HowWeWork COMPONENT ===

// === START: UPDATED ForEmployers COMPONENT WITH UI FIXES ===
const ForEmployers = () => (
  <section className="w-full bg-gray-50 overflow-hidden">
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-16">
        {/* Image on the Left */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden order-last lg:order-first lg:col-span-5 h-full">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2190&auto=format&fit=crop"
            alt="Team discussing in a modern office"
            className="w-full h-full object-cover min-h-[500px] lg:min-h-full"
          />
          <div className="absolute top-5 right-5 rounded-full bg-green-500 px-6 py-3 text-base font-bold text-white shadow-lg">
            Efficient Hiring
          </div>
        </div>

        {/* Content on the Right */}
        <div className="text-left lg:col-span-7">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            For Employers <span className="text-gray-400 font-light">/</span>{" "}
            <span className="text-green-600">
              Start Talent Hunting for Free
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            We don’t charge you anything. Just tell us who you need — and we’ll
            deliver.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            TeacherJob.in offers institutions a complete HR hiring solution,
            without the overhead of hiring a full-time HR team. Whether you're a
            school, college, or coaching center, we help you find the right
            talent — teachers, professors, non-teaching staff, or support
            personnel — all tailored to your budget, location and job role
            criteria.
          </p>

          <div className="mt-8">
            <h3 className="font-semibold text-gray-800">Here’s how we work:</h3>
            <ul className="mt-4 space-y-3 text-gray-600 list-none">
              <li className="flex items-start">
                <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500 font-bold">
                  ✓
                </span>
                <span>
                  We take care of your vacancy and qualification requirements.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500 font-bold">
                  ✓
                </span>
                <span>
                  We filter candidates based on qualification, experience &
                  salary fit and shortlist only the most suitable candidates.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500 font-bold">
                  ✓
                </span>
                <span>
                  We conduct initial resume screening and first-round
                  interviews.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500 font-bold">
                  ✓
                </span>
                <span>
                  We handle communication, follow-ups, and interview scheduling.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500 font-bold">
                  ✓
                </span>
                <span>We ensure the candidate joins after selection.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500 font-bold">
                  ✓
                </span>
                <span>
                  We guide candidates through onboarding document preparation
                  and ticket booking (if relocation is involved).
                </span>
              </li>
            </ul>
          </div>

          <p className="mt-8 font-semibold text-gray-800">
            Our platform takes care of everything — from discovery to
            onboarding. <br />
            <span className="font-normal text-gray-500">
              No HR hiring needed. No fees. No extra cost. No hassle. Just
              qualified people, ready to teach and contribute.
            </span>
          </p>

          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 justify-center rounded-lg bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Join as an Employer
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </section>
);
// === END: UPDATED ForEmployers COMPONENT ===

// === TESTIMONIALS SECTION ===
const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const total = Math.ceil(testimonials.length / 3);
  useEffect(() => {
    const i = setInterval(() => setCurrent((p) => (p + 1) % total), 4000);
    return () => clearInterval(i);
  }, [total]);
  const renderStars = (r: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < r ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Hear from teachers and institutions who have found success
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {Array.from({ length: total }, (_, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.slice(i * 3, i * 3 + 3).map((t) => (
                      <div
                        key={t.id}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="flex items-center mb-4">
                          {renderStars(t.rating)}
                        </div>
                        <blockquote className="text-gray-700 mb-6">
                          “{t.content}”
                        </blockquote>
                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                              src={t.avatar}
                              alt={t.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {t.name}
                            </h4>
                            <p className="text-sm text-gray-600">{t.role}</p>
                            <p className="text-sm text-indigo-600">
                              {t.institution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// === STATS SECTION ===
const StatsSection = () => (
  <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-indigo-600">
    <div>
      <div className="text-3xl font-bold text-white">500+</div>
      <div className="text-sm text-white mt-1">Teachers Placed</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-white">200+</div>
      <div className="text-sm text-white mt-1">Partner Schools</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-white">95%</div>
      <div className="text-sm text-white mt-1">Success Rate</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-white">4.9/5</div>
      <div className="text-sm text-white mt-1">User Rating</div>
    </div>
  </div>
);

// === INDEX COMPONENT ===
const Index = () => {
  return (
    <div className="min-h-screen bg-main text-main">
      <Header />
      <HeroCarousel />
      <HowWeWork />
      <ForEmployers />
      <JobSearchSection />
      <TestimonialsSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
