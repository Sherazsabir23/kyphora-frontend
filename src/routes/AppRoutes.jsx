import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

//Pages
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage"
import PrivacyPage from "../pages/PrivacyPage"
import TermsPage from "../pages/TermsPage"
import ContactPage from "../pages/ContactPage"
import DashboardHome from "../pages/DashboardHome";

import PasswordVault from "../pages/PasswordVault";
import SecureNotes from "../pages/SecureNotes";
import CreditCards from "../pages/CreditCards";
import IdentityVault from "../pages/IdentityVault";
import ApiKeys from "../pages/ApiKeys";
import Documents from "../pages/Documents";
import PasswordGenerator from "../pages/PasswordGenerator";
import SecurityCenter from "../pages/SecurityCenter";
import ActivityLogs from "../pages/ActivityLogs";
import Settings from "../pages/Settings";
// Auth
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import VerifyEmail from "../components/auth/VerifyEmail";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Landing */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Authentication */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

 <Route path="/dashboard" element={<DashboardLayout title="Dashboard" />}>
          <Route index element={<DashboardHome />} />

          <Route path="vault/passwords" element={<PasswordVault />} />
          <Route path="vault/notes" element={<SecureNotes />} />
          <Route path="vault/cards" element={<CreditCards />} />
          <Route path="vault/identity" element={<IdentityVault />} />
          <Route path="vault/api-keys" element={<ApiKeys />} />
          <Route path="vault/documents" element={<Documents />} />

          <Route path="generator" element={<PasswordGenerator />} />
          <Route path="security" element={<SecurityCenter />} />
          <Route path="activity" element={<ActivityLogs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
    </Routes>
  );
};

export default AppRoutes;