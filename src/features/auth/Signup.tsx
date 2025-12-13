import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useSignupMutation,
  useGoogleLoginMutation,
} from "@/features/auth/authApiService";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  setCredentials,
  setVerificationEmail,
  setTempToken,
} from "@/features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";

interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  role: string;
  termsAccepted: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading: isEmailLoading }] = useSignupMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "employer",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSuccessfulGoogleLogin = (response: any) => {
    if (response.success && response.user) {
      dispatch(setCredentials({ user: response.user, token: response.token }));
      toast.success("Signed in with Google successfully!");
      const { role } = response.user;
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "college") navigate("/dashboard/college");
      else if (role === "employer") navigate("/dashboard/employer");
      else navigate("/");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!formData.role) {
      toast.error("Please select a role before signing up with Google.");
      return;
    }
    if (!formData.termsAccepted) {
      toast.error("You must accept the terms and conditions to sign up.");
      return;
    }
    const toastId = toast.loading("Signing up with Google...");
    try {
      const response = await googleLogin({
        token: credentialResponse.credential,
        role: formData.role,
      }).unwrap();
      toast.dismiss(toastId);
      handleSuccessfulGoogleLogin(response);
    } catch (err: any) {
      toast.error(err.data?.message || "Google Sign-up failed.", {
        id: toastId,
      });
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-up failed. Please try again.");
  };

  const termsLink = useMemo(() => {
    if (formData.role === "college") {
      return "https://teacher-job.s3.ap-south-1.amazonaws.com/agreements/Signup+Term+%26+Condition+for+School.pdf";
    }
    if (formData.role === "employer") {
      return "https://teacher-job.s3.ap-south-1.amazonaws.com/agreements/TEACHER+JOB+SAMPLE+AGREEMENT.pdf";
    }
    return "#";
  }, [formData.role]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }));
    if (errors.termsAccepted) {
      setErrors((prev) => ({ ...prev, termsAccepted: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const toastId = toast.loading("Creating your account...");
    try {
      const response = await signup(formData).unwrap();
      if (!response.success) {
        throw new Error(response.message || "Signup failed");
      }

      if (response.tempToken) {
        dispatch(setTempToken(response.tempToken));
      } else {
        toast.error("Could not start verification. Please contact support.", {
          id: toastId,
        });
        return;
      }

      toast.success(response.message || "OTP sent to your email!", {
        id: toastId,
        duration: 2000,
      });
      dispatch(setVerificationEmail(formData.email));

      setTimeout(() => navigate("/verify-otp"), 1500);
    } catch (error: any) {
      const errorMessage =
        error.data?.message || error.message || "Signup failed.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
          alt="Team collaboration"
        />
        <div className="relative z-10 flex h-full flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold tracking-tight">
            Your Career Journey Begins Here
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            Connect with top educational institutions and find your dream job.
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Create a New Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already a member?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-8">
            <div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  shape="pill"
                  width="320px"
                  theme="filled_blue"
                />
              </div>
            </div>
            <div className="mt-6 relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-100 px-2 text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.fullName ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.email ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    required
                    className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.mobile ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                {errors.mobile && (
                  <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.password ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ${
                      errors.confirmPassword
                        ? "ring-red-500"
                        : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  I am a
                </label>
                <div className="mt-2">
                  <select
                    id="role"
                    name="role"
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="employer">Employee</option>
                    <option value="college">Employer</option>
                  </select>
                </div>
              </div>
              <div className="flex items-start pt-2">
                <div className="flex h-6 items-center">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${
                      errors.termsAccepted
                        ? "ring-2 ring-red-500 ring-offset-1"
                        : ""
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="termsAccepted"
                    className="font-medium text-gray-900"
                  >
                    I agree to the{" "}
                    <a
                      href={termsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!formData.role) {
                          e.preventDefault();
                          toast.error(
                            "Please select a role first to view the terms."
                          );
                        }
                      }}
                      className={`text-indigo-600 hover:text-indigo-500 ${
                        !formData.role
                          ? "cursor-not-allowed opacity-50"
                          : "underline"
                      }`}
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {errors.termsAccepted && (
                <p className="-mt-4 text-sm text-red-600">
                  {errors.termsAccepted}
                </p>
              )}
              <div>
                <button
                  type="submit"
                  disabled={isEmailLoading || isGoogleLoading}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isEmailLoading ? "Processing..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
