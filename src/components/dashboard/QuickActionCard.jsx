const QuickActionCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start rounded-2xl border border-white/[0.08] bg-white/5 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/40 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_-20px_rgba(59,130,246,0.6)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/15 text-[#60A5FA] transition-colors group-hover:bg-[#3B82F6] group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#94A3B8]">{description}</p>
    </button>
  );
};

export default QuickActionCard;
