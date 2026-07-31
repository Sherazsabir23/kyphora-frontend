const toneStyles = {
  blue: { bg: "bg-[#3B82F6]/15", text: "text-[#60A5FA]" },
  success: { bg: "bg-[#22C55E]/15", text: "text-[#22C55E]" },
  danger: { bg: "bg-[#EF4444]/15", text: "text-[#EF4444]" },
};

const StatCard = ({ icon: Icon, value, label, description, tone = "blue" }) => {
  const { bg, text } = toneStyles[tone] ?? toneStyles.blue;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 transition-colors hover:border-[#3B82F6]/40 sm:p-6">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${text}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-white/90">{label}</p>
      <p className="mt-1 text-xs text-[#94A3B8]">{description}</p>
    </div>
  );
};

export default StatCard;
