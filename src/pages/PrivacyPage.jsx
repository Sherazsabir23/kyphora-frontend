import { ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "1. Information we collect",
    body: "We collect the information you provide directly, such as your name and email when you create an account, along with encrypted vault data that only you can decrypt. We never see your master password or your unencrypted vault contents.",
  },
  {
    title: "2. How we use information",
    body: "Account information is used to authenticate you, sync your vault across devices, and send essential service communications. We do not sell your data or use it for advertising.",
  },
  {
    title: "3. Encryption and access",
    body: "All vault data is encrypted client-side before it ever reaches our servers. Kyphora staff cannot access, decrypt, or read the contents of your vault under any circumstance.",
  },
  {
    title: "4. Data retention",
    body: "We retain account data for as long as your account is active. You can request permanent deletion of your account and associated data at any time from your settings.",
  },
  {
    title: "5. Third-party services",
    body: "We rely on a small number of infrastructure providers for hosting and email delivery. These providers never have access to your unencrypted vault data.",
  },
  {
    title: "6. Your rights",
    body: "You may access, export, or delete your data at any time. Depending on your region, you may also have additional rights under applicable data protection laws.",
  },
  {
    title: "7. Changes to this policy",
    body: "We may update this policy occasionally. Material changes will be communicated by email or through an in-app notice before they take effect.",
  },
  {
    title: "8. Contact us",
    body: "Questions about this policy can be sent to our support team through the Contact page.",
  },
];

const PrivacyPage = () => {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-4 py-1.5 text-xs font-medium text-[#94A3B8]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#60A5FA]" />
            Legal
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Privacy Policy
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

export default PrivacyPage;
