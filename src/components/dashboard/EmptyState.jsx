import { Lock, Plus } from "lucide-react";

const EmptyState = ({
  heading = "Your Kyphora vault is empty",
  description = "Start protecting your digital information by adding your first secure item.",
  actionLabel = "Add First Item",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] px-6 py-16 text-center sm:py-20">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3B82F6]/15 text-[#60A5FA]">
        <Lock className="h-7 w-7" />
        <span className="absolute -inset-3 -z-10 rounded-full bg-[#3B82F6]/10 blur-xl" />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">{heading}</h3>
      <p className="mt-2 max-w-sm text-sm text-[#94A3B8]">{description}</p>

      <button
        onClick={onAction}
        className="group mt-6 flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
      >
        <Plus className="h-4 w-4" />
        {actionLabel}
      </button>
    </div>
  );
};

export default EmptyState;
