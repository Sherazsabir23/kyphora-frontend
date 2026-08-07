import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, Menu, Settings, LogOut } from "lucide-react";
import { logout as logoutRequest } from "../../services/auth.service";
import { setUser } from "../../redux/features/authSlice";

const initials = (name = "") =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const DashboardNavbar = ({ title = "Dashboard", onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // NOTE: assumes your redux auth slice stores the logged-in user at
  // state.auth.user (matching the setUser action used in Login.jsx).
  // Adjust this selector if your slice is shaped differently.
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setUser(null));
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#050816]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Left */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            onClick={onMenuClick}
            className="text-[#94A3B8] hover:text-white lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="shrink-0 text-lg font-semibold text-white">{title}</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative ml-1">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-white/5"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] text-[11px] font-semibold text-white">
                  {initials(user?.name)}
                </div>
              )}
              <ChevronDown
                className={`hidden h-3.5 w-3.5 text-[#94A3B8] transition-transform sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-white/[0.08] bg-[#0F172A] p-1.5 shadow-2xl">
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-[#94A3B8]">{user?.email}</p>
                  </div>
                  <div className="my-1 border-t border-white/[0.08]" />
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/dashboard/settings");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <div className="my-1 border-t border-white/[0.08]" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#EF4444] transition-colors hover:bg-[#EF4444]/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;