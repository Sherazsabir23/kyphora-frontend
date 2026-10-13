import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { registerUser } from "../../services/auth.service";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
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
     const response = await registerUser(formData);




    toast.success(
      response.data.message || "Success"
    );

    navigate("/verify-email", {
  state: {
    email: formData.email,
  },
});

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Something went wrong"
    );

    console.log(
      error.response?.data?.message || error.message
    );
  }finally{
    setLoading(false);
  }
};
  return (
    <div >
      <div className="text-center lg:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-[#94A3B8]">
          Start protecting your passwords and secrets in minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Jordan Lee"
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
            />
          </div>
        </div>

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
          <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
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

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#94A3B8]">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors hover:text-white"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2.5 pt-1 text-xs text-[#94A3B8]">
          <input
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
            type="checkbox"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-white/20 bg-white/5 accent-[#3B82F6]"
          />
          I agree to the{" "}
          <span className="text-[#60A5FA] hover:text-white">Terms of Service</span>{" "}
          and{" "}
          <span className="text-[#60A5FA] hover:text-white">Privacy Policy</span>.
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
      Create Account
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </>
  )}
</button>
      </form>

      <p className="mt-6 text-center text-sm text-[#94A3B8]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[#60A5FA] hover:text-white">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
