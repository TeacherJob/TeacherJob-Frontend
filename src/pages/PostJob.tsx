import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Users,
  Search,
  Briefcase,
  Quote,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import EmployerHeader from "@/components/EmployerHeader"; // Reusable header
import { useGetMyJobsQuery } from "@/features/api/employerJobApiService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// --- Interface for a posted job (no changes) ---
interface PostedJob {
  _id: string;
  title: string;
  location: string;
  schoolName: string;
  status: "pending" | "approved" | "rejected";
  jobType: string;
  description: string;
  experienceLevel: string;
  yearsOfExperience: number;
}

// --- Helper to get status badge (no changes) ---
const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="font-medium">
          Pending
        </Badge>
      );
    case "approved":
      return <Badge className="bg-green-600 text-white hover:bg-green-700">Approved</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// --- [REFACTORED] Job Post Modal using ShadCN Dialog ---
const JobPostModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., send data to an API)
    alert("Job submitted successfully! (This is a demo)");
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 bg-slate-50 rounded-t-lg border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Post a New Job
          </DialogTitle>
          <DialogDescription>
            Fill out the details below to find your next great hire.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="p-6 grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="font-semibold">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Physics Teacher"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="font-semibold">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., New Delhi, India"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobType" className="font-semibold">
                Job Type
              </Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold">
                Job Description
              </Label>
              <Textarea
                id="description"
                rows={8}
                placeholder="Describe the responsibilities, required qualifications, and benefits..."
                required
              />
            </div>
          </div>
          <DialogFooter className="p-6 pt-4 bg-slate-50 rounded-b-lg border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Post Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- [IMPROVED] FeatureCard Component ---
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center p-8 bg-white rounded-2xl border border-gray-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// --- [IMPROVED] Job Detail Modal Component ---
const JobDetailModal = ({
  job,
  onClose,
}: {
  job: PostedJob | null;
  onClose: () => void;
}) => {
  if (!job) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {job.title}
          </DialogTitle>
          <DialogDescription className="pt-1">
            {job.schoolName} • {job.location}
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-6">
          <div className="flex flex-wrap gap-3 text-sm">
            {getStatusBadge(job.status)}
            <Badge variant="outline">{job.jobType}</Badge>
            <Badge variant="outline">{job.experienceLevel}</Badge>
            <Badge variant="outline">
              {job.yearsOfExperience} years experience
            </Badge>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2 text-gray-800">
              Job Description
            </h4>
            <div className="text-sm text-gray-700 whitespace-pre-wrap prose prose-sm max-w-none">
              {job.description}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// --- [IMPROVED] Section to display posted jobs ---
const PostedJobsSection = () => {
  const { data: jobs = [], isLoading, isError } = useGetMyJobsQuery();
  const [selectedJob, setSelectedJob] = useState<PostedJob | null>(null);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      );
    }

    if (isError) {
      return (
        <Card className="p-12 text-center bg-red-50 border-red-200">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-destructive">
            Error Loading Jobs
          </h3>
          <p className="text-red-700 mt-2">
            We couldn't fetch your job posts right now. Please try again later.
          </p>
        </Card>
      );
    }

    if (jobs.length === 0) {
      return (
        <div className="text-center border-2 border-dashed rounded-2xl p-16">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-5" />
          <h3 className="text-2xl font-bold text-gray-800">No Jobs Posted Yet</h3>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            Click on "Post a Job" to create your first listing. Your active jobs
            will appear here.
          p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(jobs as PostedJob[]).map((job) => (
          <Card
            key={job._id}
            className="flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex justify-between items-start gap-3">
                <CardTitle className="text-lg font-bold">{job.title}</CardTitle>
                {getStatusBadge(job.status)}
              </div>
              <CardDescription className="pt-1">
                {job.schoolName} • {job.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-4">
                {job.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedJob(job)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Your Job Dashboard
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Manage, view, and track the status of all your posted jobs.
          </p>
        </div>
        {renderContent()}
      </div>
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </section>
  );
};

// --- [IMPROVED] Main Page Component ---
const PostJob = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <EmployerHeader />

      {/* --- [IMPROVED] HERO SECTION --- */}
      <section
        className="relative text-white py-24 sm:py-32 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary/80 to-primary opacity-95"></div>
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Hire your next great teacher. Fast.
            </h1>
            <p className="text-xl lg:text-2xl mb-10 text-blue-100">
              Reach thousands of qualified educators and find the perfect match
              for your school.
            </p>
            <Button
              size="lg"
              className="px-10 py-7 bg-white text-primary font-bold rounded-full hover:bg-gray-200 hover:scale-105 transition-all text-lg shadow-2xl"
              onClick={() => setIsFormOpen(true)}
            >
              Post a Job for Free
            </Button>
            <div className="mt-10 flex items-center justify-center gap-x-8 gap-y-4 text-slate-300 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>10,000+ Active Teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Fast & Easy Posting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Verified Institutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- "HOW IT WORKS" SECTION --- */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Everything you need to hire
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined hiring process designed for educational
              institutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Briefcase className="w-8 h-8 text-primary" />}
              title="1. Post Your Job"
              description="Create a detailed job post in minutes. Reach thousands of qualified teachers across India."
            />
            <FeatureCard
              icon={<Search className="w-8 h-8 text-primary" />}
              title="2. Find Quality Candidates"
              description="Our smart matching tools help you identify and connect with the best teachers for your role."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-primary" />}
              title="3. Hire with Confidence"
              description="Make informed decisions with detailed profiles, peer reviews, and our expert guidance."
            />
          </div>
        </div>
      </section>

      {/* --- Inserted the posted jobs section here --- */}
      <PostedJobsSection />

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Trusted by Schools Across India
            </h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-primary text-white rounded-2xl p-8 sm:p-10 text-center shadow-2xl">
              <Quote className="absolute top-6 right-6 w-20 h-20 text-white/10" />
              <img
                className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-5 border-4 border-white"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="avatar"
              />
              <blockquote className="text-xl text-blue-100 my-4 italic leading-relaxed">
                "TeacherJob helped us find a qualified Physics PGT in just two
                weeks. The process was seamless and the quality of candidates
                was exceptional."
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-white text-lg">
                  Dr. Rajesh Kumar
                </p>
                <p className="text-blue-200">Principal, Delhi Public School</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="relative py-20 bg-slate-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to find your next great hire?
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Join thousands of schools that trust TeacherJob for their hiring
            needs.
          </p>
          <Button
            size="lg"
            className="px-10 py-7 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all text-lg shadow-lg"
            onClick={() => setIsFormOpen(true)}
          >
            Post Your Job Now
          </Button>
        </div>
      </section>

      <Footer />

      {/* Render the modal form conditionally */}
      <JobPostModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default PostJob;
