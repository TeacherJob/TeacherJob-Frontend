import React from "react";
import { useAppSelector } from "@/app/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/authSlice";
import { useSaveJobMutation } from "@/features/profile/employerProfileApiService";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

// This button is for mobile header, only for teachers
const SaveJobButtonMobile = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const [saveJob, { isLoading }] = useSaveJobMutation();
  const navigate = useNavigate();
  const location = useLocation();

  // Get jobId from URL if on job details page (assumes /jobs/:id or /job/:id)
  const jobId = (() => {
    const match = location.pathname.match(/\/job[s]?\/(\w+)/);
    return match ? match[1] : null;
  })();

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to save jobs.");
      navigate("/login");
      return;
    }
    if (!currentUser || currentUser.role !== "teacher") {
      toast.error("Only teachers can save jobs.");
      return;
    }
    if (!jobId) {
      toast.error("No job selected to save.");
      return;
    }
    const loadingToast = toast.loading("Saving...");
    try {
      await saveJob(jobId).unwrap();
      toast.success("Job saved!", { id: loadingToast });
    } catch (err) {
      toast.error(err.data?.message || "Failed to save job.", {
        id: loadingToast,
      });
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      aria-label="Save Job"
      className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {/* Bookmark icon */}
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
};

export default SaveJobButtonMobile;
