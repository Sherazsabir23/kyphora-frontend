import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Lock } from "lucide-react";

// Inline brand icons — lucide-react has dropped/renamed brand icons across
// versions, so these are self-contained and won't break on upgrade.
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.47.1 2.73.65.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2V8.75Zm6.24 0h3.36v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.35V21h-3.5v-6.13c0-1.46-.03-3.34-2.03-3.34-2.04 0-2.35 1.6-2.35 3.24V21H9.44V8.75Z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 2H22l-7.4 8.46L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.9-9.04L1 2h6.9l4.8 6.3L18.9 2Zm-1.2 18.2h1.9L7.4 3.7H5.4l12.3 16.5Z" />
  </svg>
);

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about", hash: false },
      { label: "Features", to: "/#features", hash: true },
      { label: "Pricing", to: "/#pricing", hash: true },
      { label: "Contact", to: "/contact", hash: true },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Password Vault", to: "/#features", hash: true },
      { label: "Secure Notes", to: "/#features", hash: true },
      { label: "Generator", to: "/#features", hash: true },
      { label: "Dashboard", to: "/login", hash: false },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Privacy", to: "/privacy", hash: false },
      { label: "Terms", to: "/terms", hash: false },
      { label: "FAQ", to: "/#faq", hash: true },
    ],
  },
];

const socials = [
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                <Lock className="h-4 w-4" />
              </span>
              <span className="text-base font-semibold tracking-tight text-white">
               Kyphora
              </span>
            </Link>
            <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-[#94A3B8]">
              Your passwords and secrets, encrypted and in one place.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/5 text-[#94A3B8] transition-colors hover:border-[#3B82F6]/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
{link.hash ? (
  <HashLink
    smooth
    to={link.to}
    className="text-sm text-[#94A3B8] transition-colors hover:text-white"
  >
    {link.label}
  </HashLink>
) : (
  <Link
    to={link.to}
    className="text-sm text-[#94A3B8] transition-colors hover:text-white"
  >
    {link.label}
  </Link>
)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 md:flex-row">
          <p className="text-xs text-[#94A3B8]">
            © {new Date().getFullYear()} SecureVault
          </p>
          <p className="text-xs text-[#94A3B8]">
            Built with React • Node.js • MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
