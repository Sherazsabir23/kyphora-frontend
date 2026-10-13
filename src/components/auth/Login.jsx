import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { login, verify2FALogin } from "../../services/auth.service"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/authSlice";
import Loader from "../common/loader";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // NEW: 2FA challenge step
  const [twoFactorToken, setTwoFactorToken] = useState(null);
  const [twoFACode, setTwoFACode] = useState("");
  const [verifying2FA, setVerifying2FA] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login(formData);

      // NEW: 2FA required — don't log in yet, show the code step instead
      if (response.twoFactorRequired) {
        setTwoFactorToken(response.twoFactorToken);
        toast(response.message || "Enter your 2FA code to continue.");
        return;
      }

      toast.success(response.message);

      dispatch(setUser(response.user));

      navigate("/dashboard");

    }catch (error) {
  const data = error.response?.data;

  if (data?.verifyRequired) {
    toast.error(data.message);

    navigate("/verify-email", {
      state: {
        email: data.email,
      },
    });

    return;
  }

  toast.error(
    data?.message || "Something went wrong"
  );
} finally {
      setLoading(false);
    }
  };

  // NEW: submit the 6-digit authenticator code to complete login
  const handleVerify2FA = async (e) => {
    e.preventDefault();

    try {
      setVerifying2FA(true);

      const response = await verify2FALogin({
        twoFactorToken,
        token: twoFACode,
      });

      toast.success(response.message);

      dispatch(setUser(response.user));

      navigate("/dashboard");
    } catch (error) {
      const data = error.response?.data;
      toast.error(data?.message || "Invalid verification code.");
    } finally {
      setVerifying2FA(false);
    }
  };

  // NEW: 2FA code-entry view — replaces the login form once challenged
  if (twoFactorToken) {
    return (
      <div>
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Two-Factor Authentication
          </h2>
          <p className="mt-2 text-sm text-[#94A3B8]">
            Enter the 6-digit code from your authenticator app.
          </p>
        </div>

        <form onSubmit={handleVerify2FA} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
              Verification code
            </label>
            <div className="relative">
              <ShieldCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                name="twoFACode"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                type="text"
                inputMode="numeric"
                placeholder="123456"
                autoFocus
                className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={verifying2FA}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-all hover:bg-[#60A5FA] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {verifying2FA ? (
              <Loader />
            ) : (
              <>
                Verify & Sign In
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setTwoFactorToken(null);
              setTwoFACode("");
            }}
            className="w-full text-center text-xs font-medium text-[#94A3B8] hover:text-white"
          >
            Back to login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Sign in to access your encrypted vault.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="block text-xs font-medium text-[#94A3B8]">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-[#60A5FA] hover:text-white">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2.5 text-xs text-[#94A3B8]">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-3.5 w-3.5 shrink-0 rounded border-white/20 bg-white/5 accent-[#3B82F6]"
          />
          Keep me signed in
        </label>

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-all hover:bg-[#60A5FA] disabled:cursor-not-allowed disabled:opacity-70"
        >

          {loading ? (
            <Loader />
          ) : (
            <>
              Sign In
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#94A3B8]">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-[#60A5FA] hover:text-white">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
