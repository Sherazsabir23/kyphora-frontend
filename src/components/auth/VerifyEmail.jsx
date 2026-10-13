import { useRef, useState,useEffect } from "react";
import { Link ,useNavigate, useLocation} from "react-router-dom";
import { MailCheck, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Loader from '../../components/common/Loader'
import {  verifyUserEmail , resendVerificationCode } from "../../services/auth.service"
const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
const [countdown, setCountdown] = useState(60);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
const location = useLocation();

const email = location.state?.email || "";
  const handleChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
useEffect(() => {
  if (!email) {
    navigate("/signup", { replace: true });
  }
}, [email, navigate]);


useEffect(() => {
  if (countdown <= 0) return;

  const timer = setInterval(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [countdown]);
//handle submmit
 const handleSubmit = async (e) => {
  e.preventDefault();

  const otp = code.join("");

  if (otp.length !== 6) {
    return toast.error("Please enter all 6 digits");
  }

  try {
    setLoading(true);

    const response = await verifyUserEmail({
      email,
      otp,
    });

    toast.success(response.message);

    navigate("/login");

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }

};

const handleResendCode = async () => {
  if (countdown > 0) return;

  try {
    setResendLoading(true);

    const response = await resendVerificationCode(email);

    toast.success(response.message);

    setCountdown(60);
  } catch (error) {
    console.log(response.message);
  console.log(error.response?.message);
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  } finally {
    setResendLoading(false);
  }
};
  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B82F6]/15 text-[#60A5FA]">
          <MailCheck className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          Verify your email
        </h2>
        <p className="mt-2 max-w-xs text-sm text-[#94A3B8]">
          Enter the 6-digit code we sent to{" "}
        <span className="text-white">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex gap-2 sm:gap-2.5">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="h-12 w-full max-w-[48px] flex-1 rounded-xl border border-white/[0.08] bg-white/5 text-center text-lg font-semibold text-white outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07] sm:h-14"
            />
          ))}
        </div>

      <button
  type="submit"
  disabled={loading}
  className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-all hover:bg-[#60A5FA] disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? (
    <Loader />
  ) : (
    <>
      Verify Email
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </>
  )}
</button>
      </form>

      <p className="mt-6 text-center text-sm text-[#94A3B8]">
        Didn't get a code?{" "}
        <button
  type="button"
  disabled={countdown > 0 || resendLoading}
  onClick={handleResendCode}
  className="font-medium text-[#60A5FA] hover:text-white disabled:cursor-not-allowed disabled:text-[#94A3B8]"
>
  {resendLoading ? (
    <Loader />
  ) : countdown > 0 ? (
    `Resend in ${countdown}s`
  ) : (
    "Resend it"
  )}
</button>
      </p>

      <p className="mt-3 text-center text-sm text-[#94A3B8]">
        Wrong email?{" "}
        <Link to="/register" className="font-medium text-[#60A5FA] hover:text-white">
          Go back
        </Link>
      </p>
    </div>
  );
};

export default VerifyEmail;
