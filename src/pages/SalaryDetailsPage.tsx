import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Settings,
  DollarSign,
  BrainCircuit,
  Search,
  TrendingUp,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";

import { useGetSalaryGuideByIdQuery } from "@/features/admin/adminApiService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- TYPE DEFINITIONS ---
interface CareerDetails {
  _id: string;
  category: string;
  jobTitle: string;
  averageSalary: number;
  salaryRange: { min: number; max: number };
  jobDescription: string;
  commonSkills: string[];
  relatedProfiles: { _id: string; jobTitle: string }[];
}
type ButtonProps = React.ComponentProps<"button">;

// --- REUSABLE UI COMPONENTS ---
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={className}>{children}</div>;
const CardHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => <div className={className}>{children}</div>;
const CardTitle: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => <h3 className={className}>{children}</h3>;
const CardContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => <div className={className}>{children}</div>;
const IconWrapper: React.FC<{
  children: React.ReactNode;
  className: string;
}> = ({ children, className }) => (
  <div
    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${className}`}
  >
    {children}
  </div>
);
const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <Card className="bg-background rounded-2xl border border-gray-200 shadow-card">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6">
      {icon}
      <CardTitle className="font-bold text-primary-text">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-6 pt-0">{children}</CardContent>
  </Card>
);

// --- FIX: THIS COMPONENT IS COMPLETELY REDESIGNED TO MATCH THE SCREENSHOT ---
const SalaryBar: React.FC<{ low: number; high: number; avg: number }> = ({
  low,
  high,
  avg,
}) => {
  const percentage = high > low ? ((avg - low) / (high - low)) * 100 : 50;
  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  return (
    // Add margin-top to create space for the average label above the bar
    <div className="w-full mt-6">
      <div className="relative mb-4 h-8">
        {/* Average Label - Positioned absolutely based on percentage */}
        <div
          className="absolute bottom-full mb-1"
          style={{
            left: `${percentage}%`,
            transform: "translateX(-50%)",
          }}
        >
          <span className="text-lg font-bold text-primary-text border-b-2 border-primary pb-1">
            {formatCurrency(avg)}
          </span>
        </div>
      </div>

      {/* The visible bar */}
      <div className="relative h-2 bg-primary rounded-full"></div>

      {/* Low and High Labels - Positioned below the bar */}
      <div className="flex justify-between mt-2 text-sm font-medium text-secondary-text">
        <span>{formatCurrency(low)}</span>
        <span>{formatCurrency(high)}</span>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const SalaryDetailsPage = () => {
  const { careerPath: id } = useParams<{ careerPath: string }>();

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetSalaryGuideByIdQuery(id!, { skip: !id });

  const jobData = useMemo(
    () => (apiResponse?.data as CareerDetails) || null,
    [apiResponse]
  );

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <p className="text-xl text-secondary-text animate-pulse">
            Loading Job Details...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !jobData) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <p className="text-xl text-secondary-text">
              Sorry, the details for this job could not be found.
            </p>
            <Link
              to="/salary-guide"
              className="inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-6 bg-primary text-white hover:bg-primary/90 px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Salary Guide
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --- Render the page with the fetched data ---
  return (
    <div className="bg-subtle-bg text-primary-text min-h-screen font-sans overflow-x-hidden">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="relative text-white overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop"
            alt="Salary Details Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-[#ff8c5a]/80"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="mb-8">
              <Link
                to="/salary-guide"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Salary Guide
              </Link>
            </div>
            <div className="text-center">
              <p className="font-semibold text-white/90 mb-2">
                {jobData.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {jobData.jobTitle}
              </h1>
              <p className="text-lg text-white/80 mt-3">
                Average Salary in India
              </p>
              <p className="text-5xl font-bold text-white mt-2">
                ₹{jobData.averageSalary.toLocaleString("en-IN")}
                <span className="text-xl font-normal text-white/70">
                  {" "}
                  /year
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <InfoCard
                icon={
                  <IconWrapper className="bg-primary/10">
                    <DollarSign className="text-primary" />
                  </IconWrapper>
                }
                title="Salary Range"
              >
                <p className="text-secondary-text text-sm">
                  Salaries for a {jobData.jobTitle} can range from ~₹
                  {jobData.salaryRange.min.toLocaleString("en-IN")} to ~₹
                  {jobData.salaryRange.max.toLocaleString("en-IN")} per year.
                </p>
                <SalaryBar
                  low={jobData.salaryRange.min}
                  high={jobData.salaryRange.max}
                  avg={jobData.averageSalary}
                />
              </InfoCard>
              <InfoCard
                icon={
                  <IconWrapper className="bg-primary/10">
                    <Briefcase className="text-primary" />
                  </IconWrapper>
                }
                title="Job Description"
              >
                <p className="text-secondary-text leading-relaxed text-sm">
                  {jobData.jobDescription}
                </p>
              </InfoCard>
              <InfoCard
                icon={
                  <IconWrapper className="bg-success/10">
                    <BrainCircuit className="text-success" />
                  </IconWrapper>
                }
                title="Common Skills"
              >
                <div className="flex flex-wrap gap-2">
                  {jobData.commonSkills.length > 0 ? (
                    jobData.commonSkills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-success/10 text-success text-xs font-semibold px-3 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-secondary-text text-sm">
                      No specific skills listed.
                    </p>
                  )}
                </div>
              </InfoCard>
              <InfoCard
                icon={
                  <IconWrapper className="bg-warning/10">
                    <TrendingUp className="text-warning" />
                  </IconWrapper>
                }
                title="Career Outlook"
              >
                <p className="text-secondary-text leading-relaxed text-sm">
                  The demand for skilled {jobData.jobTitle}s continues to grow,
                  with opportunities for advancement into senior roles.
                  Continuous learning and specialization are key to long-term
                  success.
                </p>
              </InfoCard>
            </div>
            {/* Right Column */}
            <div className="lg:col-span-1 space-y-8">
              <div className="relative bg-gradient-to-br from-primary to-[#ff8c5a] p-6 rounded-2xl shadow-lift text-white">
                <div className="flex items-center gap-3 mb-3">
                  <IconWrapper className="bg-white/20">
                    <Search className="text-white" />
                  </IconWrapper>
                  <h3 className="text-xl font-bold">Find Your Next Job</h3>
                </div>
                <p className="text-white/80 mb-4 text-sm">
                  Ready to take the next step? Find open positions for{" "}
                  {jobData.jobTitle} roles.
                </p>
                <Button className="w-full bg-white hover:bg-subtle-bg text-primary font-bold py-2.5">
                  Search {jobData.jobTitle} Jobs
                </Button>
              </div>
              {jobData.relatedProfiles.length > 0 && (
                <InfoCard
                  icon={
                    <IconWrapper className="bg-gray-200">
                      <Settings className="text-secondary-text" />
                    </IconWrapper>
                  }
                  title="Related Profiles"
                >
                  <ul className="space-y-3">
                    {jobData.relatedProfiles.map((job) => (
                      <li key={job._id}>
                        <Link
                          to={`/career/${job._id}/salaries`}
                          className="font-semibold text-primary-text hover:text-primary hover:underline"
                        >
                          {job.jobTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              )}
              <InfoCard
                icon={
                  <IconWrapper className="bg-sky-100">
                    <Sun className="text-sky-600" />
                  </IconWrapper>
                }
                title="A Day in the Life"
              >
                <ul className="space-y-2 text-secondary-text list-disc list-inside text-sm">
                  <li>Collaborating with team on project planning.</li>
                  <li>Writing and testing code for new features.</li>
                  <li>Debugging and resolving technical issues.</li>
                  <li>Participating in code reviews for quality.</li>
                </ul>
              </InfoCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SalaryDetailsPage;
