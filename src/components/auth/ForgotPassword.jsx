import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { forgotPassword } from "../../services/auth.service";
import { toast } from "react-hot-toast";
import Loader from "../../components/common/Loader"
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      const { data } = await forgotPassword(email);

      toast.success(data.message);
      setEmail("");
    } catch (err) {


      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B82F6]/15 text-[#60A5FA]">
          <KeyRound className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          Forgot your password?
        </h2>
        <p className="mt-2 max-w-xs text-sm text-[#94A3B8]">
          Enter your email and we'll send you a link to reset it.
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
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60 focus:bg-white/[0.07]"
            />
          </div>
        </div>

       <button
  type="submit"
  disabled={loading}
  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#3B82F6] py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-all hover:bg-[#60A5FA] disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? (
    <Loader />
  ) : (
    <>
      Send Reset Link
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </>
  )}
</button>
      </form>

      <Link
        to="/login"
        className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-[#94A3B8] hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to sign in
      </Link>
    </div>
  );
};

export default ForgotPassword;
