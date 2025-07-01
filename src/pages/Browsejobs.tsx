import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { useGetPublicJobsQuery } from "@/features/api/publicJobApiService";
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
  ArrowLeft,
  FilterX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimatePresence, motion } from "framer-motion";

// Interfaces and other components are unchanged
interface Job {
  _id: string;
  title: string;
  schoolName: string;
  location: string;
  salary: string;
  type: string;
  experienceLevel: string;
  description: string;
  responsibilities: string;
  requirements: string;
  tags: string[];
}
const NewJobDetails = ({
  job,
  applicationStatus,
}: {
  job: Job;
  applicationStatus: "applied" | "saved" | null;
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();
  const [saveJob, { isLoading: isSaving }] = useSaveJobMutation();

  const handleAction = async (action: "apply" | "save") => {
    if (!isAuthenticated) {
      navigate("/login");
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
      ? job.responsibilities.split("\n").filter(Boolean)
      : [];
  const requirementsList =
    typeof job.requirements === "string"
      ? job.requirements.split("\n").filter(Boolean)
      : [];

  const renderActionButtons = () => {
    if (applicationStatus === "applied")
      return (
        <Button size="lg" className="w-full text-base" disabled>
          <Check className="w-5 h-5 mr-2" />
          Applied
        </Button>
      );
    if (applicationStatus === "saved")
      return (
        <Button
          size="lg"
          className="w-full text-base"
          variant="outline"
          disabled
        >
          <Bookmark className="w-5 h-5 mr-2" />
          Saved
        </Button>
      );
    return (
      <Button
        onClick={() => handleAction("apply")}
        disabled={isApplying || isSaving}
        size="lg"
        className="w-full bg-primary text-white hover:bg-primary/90 transition-colors font-bold text-base"
      >
        Apply Now
      </Button>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{job.title}</h2>
            <div className="mt-2 flex items-center gap-2 text-gray-700">
              <Building size={18} className="text-gray-500" />
              <p className="text-lg font-semibold text-primary">
                {job.schoolName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleAction("save")}
              disabled={isSaving || isApplying || applicationStatus !== null}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-primary/10 hover:text-primary disabled:opacity-50"
            >
              <Bookmark size={20} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-primary/10 hover:text-primary">
              <Share2 size={20} />
            </button>
          </div>
        </div>
        <div className="mt-6">{renderActionButtons()}</div>
      </div>
      <div className="px-6 py-5 border-y border-gray-200 bg-gray-50/50 flex flex-wrap gap-4">
        {[
          { icon: <Wallet size={18} />, label: job.salary },
          { icon: <MapPin size={18} />, label: job.location },
          { icon: <Briefcase size={18} />, label: job.type },
          { icon: <Clock size={18} />, label: job.experienceLevel },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <div className="text-primary">{item.icon}</div>
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
            <h4 className="font-bold text-gray-800 mb-2">About the Role</h4>
            <p className="text-gray-600">{job.description}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">
              Key Responsibilities
            </h4>
            <ul className="space-y-2 list-disc list-outside pl-5 text-gray-600">
              {responsibilitiesList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">
              Required Skills and Qualifications
            </h4>
            <ul className="space-y-2 list-disc list-outside pl-5 text-gray-600">
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
const JobListItem = ({
  job,
  isSelected,
  onClick,
  applicationStatus,
}: {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
  applicationStatus: "applied" | "saved" | null;
}) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-lg border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
      isSelected ? "border-primary ring-2 ring-primary/30" : "border-gray-200"
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
            variant={applicationStatus === "applied" ? "default" : "secondary"}
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

// --- YAHAN BADLAV KIYA GAYA HAI ---
const salaryRanges = [
  { value: "0-500000", label: "₹0 - ₹5,00,000" },
  { value: "500001-1000000", label: "₹5,00,001 - ₹10,00,000" },
  { value: "1000001-1500000", label: "₹10,00,001 - ₹15,00,000" },
  { value: "1500001-9999999", label: "Above ₹15,00,000" },
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
// --- END OF CHANGE ---

const BrowseJobsPage = () => {
  const { data: jobs = [], isLoading, isError } = useGetPublicJobsQuery();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data: myApplications = [] } = useGetMyApplicationsQuery("applied", {
    skip: !isAuthenticated,
  });
  const { data: savedApplications = [] } = useGetMyApplicationsQuery("saved", {
    skip: !isAuthenticated,
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "details">("list");

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const applicationStatusMap = useMemo(() => {
    const map = new Map();
    myApplications.forEach((app) => map.set(app.job._id, "applied"));
    savedApplications.forEach((app) => map.set(app.job._id, "saved"));
    return map;
  }, [myApplications, savedApplications]);

  const uniqueLocations = useMemo(() => {
    const allLocations = jobs.flatMap((job) =>
      job.location.split(",").map((loc) => loc.trim())
    );
    return [...new Set(allLocations)].filter(Boolean);
  }, [jobs]);

  const uniqueRoles = useMemo(
    () => [...new Set(jobs.map((job) => job.type))],
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    let tempJobs = [...jobs];

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      tempJobs = tempJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowercasedQuery) ||
          job.schoolName.toLowerCase().includes(lowercasedQuery) ||
          job.location.toLowerCase().includes(lowercasedQuery)
      );
    }

    if (locationFilter && locationFilter !== "all") {
      tempJobs = tempJobs.filter((job) =>
        job.location.includes(locationFilter)
      );
    }

    // --- YAHAN BADLAV KIYA GAYA HAI ---
    if (salaryFilter && salaryFilter !== "all") {
      tempJobs = tempJobs.filter((job) =>
        parseAndCompareSalary(job.salary, salaryFilter)
      );
    }
    // --- END OF CHANGE ---

    if (roleFilter && roleFilter !== "all") {
      tempJobs = tempJobs.filter((job) => job.type === roleFilter);
    }

    return tempJobs;
  }, [jobs, searchQuery, locationFilter, salaryFilter, roleFilter]);

  useEffect(() => {
    if (filteredJobs.length > 0) {
      if (
        !selectedJob ||
        !filteredJobs.find((j) => j._id === selectedJob._id)
      ) {
        setSelectedJob(filteredJobs[0]);
      }
    } else {
      setSelectedJob(null);
    }
  }, [filteredJobs]);

  const getJobApplicationStatus = (jobId: string) =>
    applicationStatusMap.get(jobId) || null;
  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setMobileView("details");
  };
  const handleBackToList = () => {
    setMobileView("list");
  };

  const resetFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setSalaryFilter("");
    setRoleFilter("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <section id="jobs" className="flex-grow">
          <div className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                Find Your Next Opportunity
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Explore thousands of teaching jobs from top institutions.
              </p>
              <div className="mt-8 max-w-4xl mx-auto">
                <form onSubmit={(e) => e.preventDefault()} className="w-full">
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

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger className="w-full h-11 bg-white">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    {/* --- YAHAN BADLAV KIYA GAYA HAI --- */}
                    <SelectContent className="bg-white z-50 max-h-72 overflow-y-auto custom-scrollbar">
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                    <SelectTrigger className="w-full h-11 bg-white">
                      <SelectValue placeholder="Any Salary" />
                    </SelectTrigger>
                    {/* --- YAHAN BHI BADLAV KIYA GAYA HAI --- */}
                    <SelectContent className="bg-white z-50 max-h-72 overflow-y-auto custom-scrollbar">
                      <SelectItem value="all">Any Salary</SelectItem>
                      {salaryRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full h-11 bg-white">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    {/* --- AUR YAHAN BHI BADLAV KIYA GAYA HAI --- */}
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
                    className="w-full h-11 flex items-center gap-2 text-gray-600 hover:text-primary"
                  >
                    <FilterX size={16} />
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
              <div
                className={`lg:col-span-5 xl:col-span-4 space-y-4 lg:max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar p-1 ${
                  mobileView === "list" ? "block" : "hidden"
                } lg:block`}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-24 text-lg font-semibold text-gray-600 gap-3">
                    <Loader2 className="animate-spin w-8 h-8 text-primary" />
                    Loading Jobs...
                  </div>
                ) : isError ? (
                  <div className="flex flex-col items-center justify-center py-24 text-lg font-semibold text-red-600 gap-3">
                    <AlertTriangle className="w-8 h-8" />
                    Failed to load jobs.
                  </div>
                ) : filteredJobs.length > 0 ? (
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedJob?._id || "no-job-selected"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedJob ? (
                      <NewJobDetails
                        job={selectedJob}
                        applicationStatus={getJobApplicationStatus(
                          selectedJob._id
                        )}
                      />
                    ) : (
                      !isLoading && (
                        <div className="flex items-center justify-center h-full bg-white rounded-xl border-2 border-dashed border-gray-300 py-40">
                          <p className="text-gray-500 text-lg">
                            Select a job to see details
                          </p>
                        </div>
                      )
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BrowseJobsPage;
