import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CountUp from "react-countup";
import { useAppSelector } from "@/app/hooks";
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "@/features/auth/authSlice";
import { useGetPublicJobsQuery } from "@/features/api/publicJobApiService";
import { useGetPublishedSlidesQuery } from "@/features/api/publicApiService";
import {
  useApplyToJobMutation,
  useSaveJobMutation,
  useGetMyApplicationsQuery,
} from "@/features/profile/employerProfileApiService";
import {
  MapPin,
  Briefcase,
  Clock,
  Check,
  Bookmark,
  Share2,
  Wallet,
  Building,
  Loader2,
  AlertTriangle,
  Search,
  FilterX,
  ArrowLeft,
  CalendarDays,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShieldCheckIcon,
  GiftIcon,
  PhoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

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
  department: string;
  subjects: string[];
  applicationDeadline: string;
  benefits: string;
  status: string;
}

interface CarouselSlide {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  backgroundMedia: { url: string };
  backgroundType: "image" | "video";
  gradient: string;
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
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D&auto=format&fit=crop&w=1170&q=80",
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
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D&auto=format&fit=crop&w=1170&q=80",
  },
];

const HeroCarousel = () => {
  const { data: slidesResponse, isLoading } = useGetPublishedSlidesQuery();
  const slides = slidesResponse?.data || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (!slides || slides.length < 2) return;
    setIsVideoLoaded(false);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    setIsVideoLoaded(false);
  }, [currentSlide]);

  if (isLoading) {
    return <div className="min-h-[600px] bg-gray-200 animate-pulse"></div>;
  }

  if (slides.length === 0) {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-gray-800 text-white">
        No slides available.
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative overflow-hidden bg-main">
      <div className="relative min-h-[600px] flex items-center justify-center">
        {currentSlideData.backgroundMedia?.url && (
          <>
            {currentSlideData.backgroundType === "image" && (
              <img
                src={currentSlideData.backgroundMedia.url}
                alt="slide background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                style={{ filter: "brightness(0.85)" }}
              />
            )}
            {currentSlideData.backgroundType === "video" && (
              <>
                <img
                  src={
                    currentSlideData.backgroundImage ||
                    "path/to/your/default-fallback-image.jpg"
                  }
                  alt="slide background fallback"
                  className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
                    isVideoLoaded ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ filter: "brightness(0.7)" }}
                />
                <video
                  key={currentSlideData._id}
                  className={`absolute top-0 left-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ${
                    isVideoLoaded ? "opacity-40" : "opacity-0"
                  }`}
                  src={currentSlideData.backgroundMedia.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setIsVideoLoaded(true)}
                />
              </>
            )}
          </>
        )}
        <div className={`absolute inset-0 bg-gradient-to-br opacity-75 z-20`} />
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white text-primary font-bold bg-opacity-20 rounded-full text-md">
              {currentSlideData.subtitle}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight drop-shadow-lg">
            {currentSlideData.title}
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto leading-relaxed drop-shadow">
            {currentSlideData.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={currentSlideData.primaryButtonLink}
              className="px-8 py-4 text-base font-medium rounded-full text-white bg-primary hover:opacity-90 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {currentSlideData.primaryButtonText}
            </Link>
            <Link
              to={currentSlideData.secondaryButtonLink}
              className="px-8 py-4 border border-primary text-base font-medium rounded-full text-primary bg-white hover:bg-subtle md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
            >
              {currentSlideData.secondaryButtonText}
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
      toast.error("Please log in to perform this action.");
      navigate("/login");
      return;
    }
    if (currentUser?.role === "college") {
      toast.error(`Colleges cannot ${action} for jobs.`);
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

  const handleShare = async () => {
    const jobUrl = `${window.location.origin}${window.location.pathname}?jobId=${job._id}`;
    const shareData = {
      title: job.title,
      text: `Check out this job: ${job.title} at ${job.schoolName}`,
      url: jobUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        toast.error("Could not share job.");
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success("Job link copied to clipboard!");
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
  const benefitsList =
    typeof job.benefits === "string"
      ? job.benefits.split("\n").filter((line) => line.trim() !== "")
      : [];

  const deadline = new Date(job.applicationDeadline).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const renderActionButtons = () => {
    if (applicationStatus === "applied") {
      return (
        <Button size="lg" className="w-full text-base" disabled>
          <Check className="w-5 h-5 mr-2" />
          Applied
        </Button>
      );
    }
    return (
      <Button
        onClick={() => handleAction("apply")}
        disabled={isApplying || isSaving}
        size="lg"
        className="w-full bg-orange-500 text-white hover:bg-orange-600 transition-colors text-base font-semibold rounded-lg disabled:bg-orange-300"
      >
        {isApplying ? <Loader2 className="animate-spin mr-2" /> : "Apply Now"}
      </Button>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <div className="mt-1 flex items-center gap-2 text-gray-700">
              <Building size={16} className="text-indigo-600" />
              <p className="text-md font-semibold text-indigo-600 hover:underline cursor-pointer">
                {job.schoolName}
              </p>
            </div>
            <div className="mt-3 space-y-2 text-gray-600">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap size={16} className="text-gray-500" />
                <span className="font-medium text-gray-800">
                  Department: {job.department}
                </span>
              </div>
              {job.subjects && job.subjects.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen size={16} className="text-gray-500" />
                  <span className="font-medium text-gray-800">
                    Subjects: {job.subjects.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleAction("save")}
              disabled={isSaving || isApplying || applicationStatus !== null}
              className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
              title="Save Job"
            >
              <Bookmark size={20} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              title="Share Job"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
        <div className="mt-6">{renderActionButtons()}</div>
      </div>

      <div className="px-6 py-5 border-y border-gray-200 bg-gray-50/50 flex flex-wrap gap-x-8 gap-y-4">
        {[
          { icon: <Wallet size={16} />, label: job.salary },
          { icon: <MapPin size={16} />, label: job.location },
          { icon: <Briefcase size={16} />, label: job.type },
          { icon: <Clock size={16} />, label: job.experienceLevel },
          { icon: <CalendarDays size={16} />, label: `Deadline: ${deadline}` },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-600 text-sm"
          >
            <div className="text-gray-500">{item.icon}</div>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Full Job Description
        </h3>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">About the Role</h4>
            <p className="text-gray-600">{job.description}</p>
          </div>
          {responsibilitiesList.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Key Responsibilities
              </h4>
              <ul className="space-y-2 list-disc list-outside pl-5 text-gray-600">
                {responsibilitiesList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {requirementsList.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Required Skills and Qualifications
              </h4>
              <ul className="space-y-2 list-disc list-outside pl-5 text-gray-600">
                {requirementsList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {benefitsList.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <GiftIcon className="h-5 w-5 text-gray-500" /> Benefits & Perks
              </h4>
              <ul className="space-y-2 list-disc list-outside pl-5 text-gray-600">
                {benefitsList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
      className={`bg-white rounded-lg border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
        isSelected
          ? "border-primary ring-2 ring-primary/30"
          : "border-gray-200"
      }`}
    >
      <div className="p-5 relative">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
            <p className="text-sm font-semibold text-gray-600 mt-1">
              {job.schoolName}
            </p>
          </div>
          {applicationStatus && (
            <Badge
              variant={
                applicationStatus === "applied" ? "default" : "secondary"
              }
              className="capitalize"
            >
              {applicationStatus}
            </Badge>
          )}
        </div>
        <div className="mt-4 space-y-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={16} />
            <span>{job.salary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const salaryRanges = [
  { value: "0-600000", label: "Up to ₹6,00,000" },
  { value: "600001-1000000", label: "₹6,00,001 - ₹10,00,000" },
  { value: "1000001-1500000", label: "₹10,00,001 - ₹15,00,000" },
  { value: "1500001-9999999", label: "Over ₹15,00,000" },
];

const parseAndCompareSalary = (
  jobSalary: string,
  rangeValue: string
): boolean => {
  const numbers = jobSalary.replace(/₹|,/g, "").match(/\d+/g)?.map(Number);
  if (!numbers || numbers.length === 0) return false;

  const jobAvgSalary =
    numbers.length > 1 ? (numbers[0] + numbers[1]) / 2 : numbers[0];

  const [min, max] = rangeValue.split("-").map(Number);

  return jobAvgSalary >= min && jobAvgSalary <= max;
};

const JobSearchSection = () => {
  const { data: jobsResponse, isLoading, isError } = useGetPublicJobsQuery();
  const jobs = jobsResponse || [];
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data: myApplications = [] } = useGetMyApplicationsQuery("applied", {
    skip: !isAuthenticated,
  });
  const { data: savedApplications = [] } = useGetMyApplicationsQuery("saved", {
    skip: !isAuthenticated,
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ location: "", salaryRange: "" });
  const [mobileView, setMobileView] = useState<"list" | "details">("list");
  const [searchParams] = useSearchParams();

  const applicationStatusMap = useMemo(() => {
    const map = new Map();
    myApplications.forEach((app) => map.set(app.job._id, "applied"));
    savedApplications.forEach((app) => map.set(app.job._id, "saved"));
    return map;
  }, [myApplications, savedApplications]);

  const uniqueLocations = useMemo(() => {
    if (!jobs) return [];
    const activeJobs = jobs.filter(job => job.status === "active");
    const allLocations = activeJobs.flatMap((job) =>
      job.location.split(",").map((loc) => loc.trim())
    );
    return [...new Set(allLocations)].filter(Boolean).sort();
  }, [jobs]);

  const uniqueRoles = useMemo(() => {
    if (!jobs) return [];
    const activeJobs = jobs.filter(job => job.status === "active");
    return [...new Set(activeJobs.map((job) => job.type))].filter(Boolean).sort();
  }, [jobs]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value === "all" ? "" : value }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({ location: "", salaryRange: "" });
  };

  const filteredJobs = useMemo(() => {
    let tempJobs = jobs.filter(job => job.status === "active");
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      tempJobs = tempJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowercasedQuery) ||
          job.schoolName.toLowerCase().includes(lowercasedQuery) ||
          job.location.toLowerCase().includes(lowercasedQuery)
      );
    }
    if (filters.location) {
      tempJobs = tempJobs.filter((job) =>
        job.location.includes(filters.location)
      );
    }
    if (filters.salaryRange) {
      tempJobs = tempJobs.filter((job) =>
        parseAndCompareSalary(job.salary, filters.salaryRange)
      );
    }
    return tempJobs;
  }, [jobs, searchQuery, filters]);

  useEffect(() => {
    if (filteredJobs.length > 0) {
      if (!selectedJob || !filteredJobs.find((j) => j._id === selectedJob._id)) {
        const jobIdFromUrl = searchParams.get("jobId");
        const jobFromUrl = filteredJobs.find((j) => j._id === jobIdFromUrl);
        if (jobFromUrl) {
          setSelectedJob(jobFromUrl);
          setMobileView("details");
        } else {
          setSelectedJob(filteredJobs[0]);
        }
      }
    } else {
      setSelectedJob(null);
    }
  }, [filteredJobs, selectedJob, searchParams]);

  const getJobApplicationStatus = (jobId: string) =>
    applicationStatusMap.get(jobId) || null;

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setMobileView("details");
  };

  const handleBackToList = () => {
    setMobileView("list");
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-24 text-lg font-semibold text-gray-600 gap-3">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
        Loading Jobs...
      </div>
    );
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-24 text-lg font-semibold text-red-600 gap-3">
        <AlertTriangle className="w-8 h-8" />
        Failed to load jobs. Please try again later.
      </div>
    );

  return (
    <section id="jobs" className="bg-gray-50 flex-grow">
      <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Find Your Next Opportunity
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Explore thousands of teaching jobs from top institutions.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-10 space-y-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by job title, school, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-6 rounded-full border-2 border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              value={filters.location}
              onValueChange={(value) => handleFilterChange("location", value)}
            >
              <SelectTrigger className="w-full h-11 bg-white rounded-lg">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50 max-h-72 overflow-y-auto custom-scrollbar">
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.salaryRange}
              onValueChange={(value) => handleFilterChange("salaryRange", value)}
            >
              <SelectTrigger className="w-full h-11 bg-white rounded-lg">
                <SelectValue placeholder="Any Salary" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50 max-h-72 overflow-y-auto custom-scrollbar">
                <SelectItem value="all">Any Salary</SelectItem>
                {salaryRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => handleFilterChange("role", value)}>
              <SelectTrigger className="w-full h-11 bg-white rounded-lg">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50 max-h-72 overflow-y-auto custom-scrollbar">
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              onClick={resetFilters}
              className="w-full h-11 flex items-center gap-2 text-gray-600 hover:text-primary rounded-lg"
            >
              <FilterX size={16} />
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
          <div
            className={`lg:col-span-5 xl:col-span-4 space-y-4 lg:max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar p-1 ${
              mobileView === "list" ? "block" : "hidden"
            } lg:block`}
          >
            {filteredJobs.length > 0 ? (
              <>
                <p className="text-sm font-medium text-gray-600 px-2">
                  Showing {filteredJobs.length} jobs
                </p>
                {filteredJobs.map((job) => (
                  <JobListItem
                    key={job._id}
                    job={job}
                    isSelected={selectedJob?._id === job._id}
                    onClick={() => handleJobSelect(job)}
                    applicationStatus={getJobApplicationStatus(job._id)}
                  />
                ))}
              </>
            ) : (
              <div className="text-center py-20 px-4 bg-white rounded-lg border">
                <h3 className="text-xl font-semibold text-gray-800">
                  No jobs found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filters.
                </p>
                <Button onClick={resetFilters} className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
          <div
            className={`lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar ${
              mobileView === "details" ? "block" : "hidden"
            } lg:block`}
          >
            <Button
              variant="outline"
              onClick={handleBackToList}
              className="mb-4 lg:hidden flex items-center w-full sticky top-0 bg-gray-50 z-10"
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
              !isLoading && (
              <div className="hidden lg:flex items-center justify-center h-full bg-white rounded-xl border-2 border-dashed border-gray-300 py-40">
                <p className="text-gray-500 text-lg">
                  Select a job to see details
                </p>
              </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const HowWeWork = () => (
  <section className="w-full bg-white overflow-hidden">
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-16">
        <div className="text-left lg:col-span-7">
          <div className="mb-6">
            <p className="text-2xl lg:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500">
              School, Coaching, Ya Ho Teacher, Sabke Liye Hai Yahan Future..
            </p>
          </div>

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
                dedicated support from our team for up to 1 year (24x7).
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

        <div className="relative rounded-2xl shadow-2xl overflow-hidden lg:col-span-5 h-full">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
            alt="Team of educators collaborating"
            className="w-full h-full object-cover min-h-[500px] lg:min-h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>

          <div className="absolute top-5 right-5 text-center rounded-full bg-green-500/95 backdrop-blur-sm px-5 py-3 text-sm font-bold text-white shadow-lg">
            💸 No Registration Fee
            <br />
            <span className="font-normal">First Salary, Then We Charge</span>
          </div>

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
                24x7 Dedicated Support
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

const ForEmployers = () => (
  <section className="w-full bg-gray-50 overflow-hidden">
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-16">
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
            <ul className="mt-4 space-y-3 text-gray-600 list-disc list-inside">
              <li>We take care of your vacancy and qualification requirements.</li>
              <li>We filter candidates based on qualification, experience & salary fit and shortlist only the most suitable candidates.</li>
              <li>We conduct initial resume screening and first-round interviews.</li>
              <li>We handle communication, follow-ups, and interview scheduling.</li>
              <li>We ensure the candidate joins after selection.</li>
              <li>We guide candidates through onboarding document preparation and ticket booking (if relocation is involved).</li>
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

const StatsSection = () => (
  <div className="bg-primary py-16 sm:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Trusted by Educators Across India
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-bold text-white">
            <CountUp
              end={500}
              duration={2.75}
              enableScrollSpy
              scrollSpyDelay={200}
              suffix="+"
            />
          </div>
          <div className="text-sm text-indigo-200 mt-2">
            Successful Job Placements
          </div>
        </div>
        <div>
          <div className="text-4xl font-bold text-white">
            <CountUp
              end={200}
              duration={2.75}
              enableScrollSpy
              scrollSpyDelay={200}
              suffix="+"
            />
          </div>
          <div className="text-sm text-indigo-200 mt-2">
            Partner Schools & Colleges
          </div>
        </div>
        <div>
          <div className="text-4xl font-bold text-white">
            <CountUp
              end={95}
              duration={2.75}
              enableScrollSpy
              scrollSpyDelay={200}
              suffix="%"
            />
          </div>
          <div className="text-sm text-indigo-200 mt-2">
            Placement Success Rate
          </div>
        </div>
        <div>
          <div className="text-4xl font-bold text-white">
            <CountUp
              end={4.9}
              decimals={1}
              duration={2.75}
              enableScrollSpy
              scrollSpyDelay={200}
              suffix="/5"
            />
          </div>
          <div className="text-sm text-indigo-200 mt-2">
            Verified by Teacher
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-main text-main">
      <Header />
      <HeroCarousel />
      <HowWeWork />
      <ForEmployers />
      <JobSearchSection />
{/*       <TestimonialsSection /> */}
{/*       <StatsSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
