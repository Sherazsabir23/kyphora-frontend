import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How secure is Kyphora?",
    answer:
      "Every item is encrypted client-side with AES-256 before it's stored, and access is protected by JWT-based authentication with rate-limited login attempts.",
  },
  {
    question: "Is my password encrypted?",
    answer:
      "Yes. Your master password is hashed and salted — it's never stored or transmitted in plain text, and Kyphora never has access to it.",
  },
  {
    question: "Can I export my data?",
    answer:
      "You can export your vault at any time in an encrypted format, so you're never locked into the platform.",
  },
  {
    question: "Is Kyphora free?",
    answer:
      "A free tier covers the core vault, generator, and sync features. Additional storage and admin controls are available on paid plans.",
  },
  {
    question: "Can I use multiple devices?",
    answer:
      "Yes — your vault syncs automatically across desktop, mobile, and browser extensions, all protected by the same encryption.",
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-white/[0.08] py-5">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between text-left"
      aria-expanded={isOpen}
    >
      <span className="text-sm font-medium text-white md:text-base">{question}</span>
      <ChevronDown
        className={`h-4 w-4 shrink-0 text-[#94A3B8] transition-transform duration-300 ${
          isOpen ? "rotate-180 text-[#60A5FA]" : ""
        }`}
      />
    </button>
    <div
      className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <p className="text-sm leading-relaxed text-[#94A3B8]">{answer}</p>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              {...faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
