// src/pages/ResetPassword.tsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/features/auth/authApiService";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff } from "lucide-react";

const ResetPassword: React.FC = () => {
  // URL से 'token' पैरामीटर को पकड़ता है
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid password reset link. No token found.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const toastId = toast.loading("Resetting password...");
    try {
      // API को टोकन और नया पासवर्ड भेजता है
      await resetPassword({ token, password, confirmPassword }).unwrap();
      toast.success("Password reset successfully!", { id: toastId });
      navigate("/login"); // सफल होने पर लॉगिन पेज पर भेजें
    } catch (err: any) {
      console.error("Reset Password Error:", err);
      toast.error(
        err.data?.message ||
          "Failed to reset password. The link might be invalid or expired.",
        { id: toastId }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
            Set New Password
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Enter and confirm your new password below.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              className="pl-10 h-12 pr-10"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
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
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
