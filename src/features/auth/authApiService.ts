// features/auth/authApiService.ts (Full Corrected Code)

import { apiService } from "../api/apiService";
import { User } from "@/types/user"; // Assuming you have this type definition

// --- INTERFACE DEFINITIONS ---

interface BaseResponse {
  success: boolean;
  message?: string;
}

// Response for login, verifyOtp, googleLogin etc.
interface AuthResponse extends BaseResponse {
  user?: User;
  token?: string; // This is the permanent login token
}

// Response specifically for the signup endpoint
interface SignupResponse extends BaseResponse {
  email?: string;
  otpSent?: boolean;
  tempToken?: string; // This is the temporary token for OTP verification
}

// Response for the /me endpoint
interface MeResponse extends BaseResponse {
  data: User;
}

// --- API ENDPOINTS ---

export const authApiService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/auth/me - Fetches the currently logged-in user
    getMe: builder.query<MeResponse, void>({
      query: () => "auth/me",
      providesTags: ["User"],
    }),

    // POST /api/auth/signup - Creates a new user
    signup: builder.mutation<
      SignupResponse,
      {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
        role: string;
        termsAccepted: boolean;
      }
    >({
      query: (userInfo) => ({
        url: "auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),

    // POST /api/auth/verify-otp - Verifies the OTP
    verifyOtp: builder.mutation<AuthResponse, { otp: string }>({
      query: (credentials) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // POST /api/auth/resend-otp - Resends the OTP
    resendOtp: builder.mutation<BaseResponse, { email: string }>({
      query: (credentials) => ({
        url: "auth/resend-otp", // Assuming you have this route on the backend
        method: "POST",
        body: credentials,
      }),
    }),

    // POST /api/auth/login - Logs a user in
    login: builder.mutation<
      AuthResponse,
      {
        email: string;
        password: string;
        rememberMe?: boolean;
      }
    >({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // POST /api/auth/google - Logs in with Google
    googleLogin: builder.mutation<
      AuthResponse,
      { token: string; role?: string }
    >({
      query: (credentials) => ({
        url: "auth/google",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    // GET /api/auth/logout
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    // --- Other password/account management endpoints ---

    forgotPassword: builder.mutation<BaseResponse, { email: string }>({
      query: (body) => ({ url: "auth/forgot-password", method: "POST", body }),
    }),

    resetPassword: builder.mutation<
      AuthResponse,
      { token: string; password: string; confirmPassword: string }
    >({
      query: ({ token, ...body }) => ({
        url: `auth/reset-password/${token}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation<
      BaseResponse,
      { currentPassword: string; newPassword: string; confirmPassword: string }
    >({
      query: (credentials) => ({
        url: "auth/update-password",
        method: "PUT",
        body: credentials,
      }),
    }),

    deleteAccount: builder.mutation<BaseResponse, { password: string }>({
      query: (credentials) => ({
        url: "auth/delete-account",
        method: "DELETE",
        body: credentials,
      }),
    }),
  }),
});

// Export the auto-generated hooks for use in components
export const {
  useGetMeQuery,
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useResendOtpMutation, // Export the new hook
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useGoogleLoginMutation,
  useDeleteAccountMutation,
  useLogoutMutation,
} = authApiService;
