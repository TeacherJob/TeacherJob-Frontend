// src/features/api/apiService.ts (Full Corrected Code)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store"; // Adjust path to your store if needed

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  // Keep this for HttpOnly cookie-based sessions after login
  credentials: "include",

  // --- THIS IS THE CRUCIAL FIX ---
  // This function runs before every request to attach the correct token.
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    // First, try to get the permanent login token from state
    const token = state.auth.token;

    // If no permanent token, get the temporary OTP token
    const tempToken = state.auth.tempToken;

    // Use whichever token is available (permanent token has priority)
    const activeToken = token || tempToken;

    // If we have a token (and it's not a placeholder), add it to the 'Authorization' header
    if (activeToken && activeToken !== "true" && activeToken !== "cookie_set") {
      headers.set("authorization", `Bearer ${activeToken}`);
    }

    return headers;
  },
});

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "User",
    "EmployerProfile",
    "CollegeProfile",
    "AdminProfile",
    "Job",
    "Application",
    "Notification",
    "Salary",
    "Interview",
    "Photo",
    "SalaryGuide",
    "CareerArticle",
    "Review",
    "Resource",
    "PressArticle",
    "EmployerJob",
  ],
  endpoints: () => ({}),
});
