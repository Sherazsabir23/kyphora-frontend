import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of terms",
    body: "By creating an account or using Kyphora, you agree to be bound by these Terms & Conditions. If you don't agree with any part of these terms, please don't use the service.",
  },
  {
    title: "2. Account responsibilities",
    body: "You're responsible for keeping your master password confidential. Because your vault is encrypted end-to-end, we cannot recover it if it's lost — please store it somewhere safe.",
  },
  {
    title: "3. Acceptable use",
    body: "You agree not to use Kyphora to store or transmit unlawful content, attempt to breach our systems, or interfere with the service's normal operation.",
  },
  {
    title: "4. Service availability",
    body: "We aim for high availability but don't guarantee uninterrupted access. Scheduled maintenance and unforeseen outages may occasionally affect the service.",
  },
  {
    title: "5. Subscription and billing",
    body: "Paid plans are billed on a recurring basis as described at checkout. You may cancel at any time, with access continuing until the end of the current billing period.",
  },
  {
    title: "6. Termination",
    body: "You may close your account at any time. We reserve the right to suspend accounts that violate these terms or pose a security risk to the platform.",
  },
  {
    title: "7. Limitation of liability",
    body: "Kyphora is provided on an 'as is' basis. To the fullest extent permitted by law, we are not liable for indirect or consequential damages arising from use of the service.",
  },
  {
    title: "8. Changes to these terms",
    body: "We may revise these terms from time to time. Continued use of Kyphora after changes take effect constitutes acceptance of the updated terms.",
  },
];

const TermsPage = () => {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-4 py-1.5 text-xs font-medium text-[#94A3B8]">
            <FileText className="h-3.5 w-3.5 text-[#60A5FA]" />
            Legal
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-[#94A3B8]">Last updated: July 1, 2026</p>
        </div>

        <div className="mt-14 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
