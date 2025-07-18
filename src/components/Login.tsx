import React, { useState } from "react";
// 1. useNavigate को यहां इम्पोर्ट करें
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/app/hooks";
import {
  useLoginMutation,
  useGoogleLoginMutation,
  useForgotPasswordMutation,
} from "@/features/auth/authApiService";
import { setCredentials } from "@/features/auth/authSlice";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Briefcase } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  // 2. useNavigate हुक को यहां कॉल करें
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] =
    useForgotPasswordMutation();

  const handleSuccessfulLogin = (response) => {
    if (response.success && response.user) {
      dispatch(setCredentials({ user: response.user }));
      toast.success("Logged in successfully!");
      const { role } = response.user;
      // अब 'navigate' फ़ंक्शन सही से काम करेगा
      if (role === "admin") navigate("/dashboard/admin");
      else if (role === "college") navigate("/dashboard/college");
      else if (role === "employer") navigate("/dashboard/employer");
      else if (role === "employee") navigate("/dashboard/employee");
      else navigate("/");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await googleLogin({
        token: credentialResponse.credential,
      }).unwrap();
      handleSuccessfulLogin(response);
    } catch (err) {
      toast.error(
        err.data?.message ||
          "Google Sign-In failed. If you are new, please use the Sign Up page and select a role."
      );
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In failed. Please try again.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      handleSuccessfulLogin(response);
    } catch (err) {
      toast.error(err.data?.message || "Invalid email or password");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending password reset email...");
    try {
      await forgotPassword({ email: forgotEmail }).unwrap();
      toast.success("Password reset email sent successfully!", { id: toastId });
      setForgotEmail("");
      setShowForgotPassword(false);
    } catch (err) {
      console.error("Forgot Password Error:", err);
      toast.error(
        err.data?.message || "Failed to send reset email. Please try again.",
        { id: toastId }
      );
    }
  };

  // --- बाकी का JSX कोड वैसा ही रहेगा ---
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 p-12 text-white">
        <div className="text-center">
          <Briefcase className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold tracking-tight">Welcome Back!</h1>
          <p className="mt-4 text-lg text-indigo-200">
            Your next opportunity is just a login away. Sign in to continue your
            journey.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
              {showForgotPassword
                ? "Reset Your Password"
                : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              {showForgotPassword ? (
                <>
                  Back to{" "}
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Or{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    create a new account
                  </Link>
                </>
              )}
            </p>
          </div>

          {showForgotPassword ? (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="pl-10 h-12"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90 transition-opacity"
                disabled={isForgotLoading}
              >
                {isForgotLoading ? "Sending..." : "Send Reset Email"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="pl-10 h-12"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="pl-10 h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="button" // Important: Change to type="button" to prevent form submission
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </button>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90 transition-opacity"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          )}

          {!showForgotPassword && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-50 px-2 text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  shape="pill"
                  width="320px"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
