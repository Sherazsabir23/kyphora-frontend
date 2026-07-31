import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Lock, Menu, X } from "lucide-react";
import { useSelector ,useDispatch} from "react-redux";
import { logout } from "../../services/auth.service"; // apne path ke hisaab se
import { logoutUser } from "../../redux/features/authSlice";
const navLinks = [
  {
    label: "Features",
    to: "/#features",
    hash: true,
  },
  {
    label: "Security",
    to: "/#security",
    hash: true,
  },
  {
    label: "FAQ",
    to: "/#faq",
    hash: true,
  },
  {
    label: "About",
    to: "/about",
    hash: false,
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
const navigate = useNavigate();
const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
const handleLogout = async () => {
  try {
    await logout();

    dispatch(logoutUser());

    setMobileOpen(false);

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
          ? "border-b border-white/[0.08] bg-[#050816]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
            <Lock className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            Kyphora
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.hash ? (
              <HashLink
                key={link.label}
                smooth
                to={link.to}
                className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
              >
                {link.label}
              </HashLink>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop actions */}
    <div className="hidden items-center gap-3 md:flex">
  {user ? (
  <>
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
    >
      Logout
    </button>

    <Link
      to="/dashboard"
      className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
    >
      Dashboard
    </Link>
  </>
) : (
  <>
    <Link
      to="/login"
      className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
    >
      Login
    </Link>

    <Link
      to="/signup"
      className="rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
    >
      Get Started
    </Link>
  </>
)}
</div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/[0.08] bg-[#050816]/95 px-6 py-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) =>
              link.hash ? (
                <HashLink
                  key={link.label}
                  smooth
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
                >
                  {link.label}
                </HashLink>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              )
            )}
           <div className="mt-2 flex flex-col gap-3 border-t border-white/[0.08] pt-5">
 {user ? (
  <>
    <button
      onClick={handleLogout}
      className="text-left text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
    >
      Logout
    </button>

    <Link
      to="/dashboard"
      onClick={() => setMobileOpen(false)}
      className="rounded-xl bg-[#3B82F6] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#60A5FA]"
    >
      Dashboard
    </Link>
  </>
) : (
  <>
    <Link
      to="/login"
      onClick={() => setMobileOpen(false)}
      className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
    >
      Login
    </Link>

    <Link
      to="/signup"
      onClick={() => setMobileOpen(false)}
      className="rounded-xl bg-[#3B82F6] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#60A5FA]"
    >
      Get Started
    </Link>
  </>
)}
</div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
