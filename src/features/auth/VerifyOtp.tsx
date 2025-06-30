import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useVerifyOtpMutation, useResendOtpMutation } from "./authApiService";
import { setCredentials, selectVerificationEmail } from "./authSlice";
import { KeyRound, RefreshCw } from "lucide-react";

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const emailForVerification = useSelector(selectVerificationEmail);
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!emailForVerification) {
      toast.error("Verification session expired. Please sign up again.", {
        duration: 4000,
      });
      navigate("/signup");
    } else {
      // Focus the first input on load
      inputRefs.current[0]?.focus();
    }
  }, [emailForVerification, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const combinedOtp = otp.join("");
    if (combinedOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    const toastId = toast.loading("Verifying OTP...");
    try {
      const response = await verifyOtp({ otp: combinedOtp }).unwrap();
      if (response.success && response.user && response.token) {
        dispatch(
          setCredentials({ user: response.user, token: response.token })
        );

        toast.success("Verification successful! Welcome.", {
          id: toastId,
          duration: 2000,
        });

        const { role } = response.user;

        // Navigate after a delay
        setTimeout(() => {
          if (role === "admin") navigate("/dashboard/admin");
          else if (role === "employer") navigate("/dashboard/employer");
          else if (role === "employee") navigate("/dashboard/employee");
          else navigate("/");
        }, 1500);
      } else {
        throw new Error(response.message || "Verification failed.");
      }
    } catch (error: any) {
      const errorMessage =
        error.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleResendOtp = async () => {
    const toastId = toast.loading("Resending OTP...");
    try {
      await resendOtp({ email: emailForVerification! }).unwrap();
      toast.success("A new OTP has been sent to your email.", { id: toastId });
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to resend OTP.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit code to{" "}
            <strong className="font-medium text-gray-800">
              {emailForVerification || "your email"}
            </strong>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={isVerifying || otp.join("").length !== 6}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isVerifying ? "Verifying..." : "Verify Account"}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto gap-2"
          >
            {isResending ? (
              <>
                <RefreshCw className="animate-spin h-4 w-4" /> Sending...
              </>
            ) : (
              "Resend Code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
