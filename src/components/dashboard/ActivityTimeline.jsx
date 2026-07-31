import { LogIn, KeyRound, RefreshCw, ShieldCheck } from "lucide-react";

const defaultActivity = [
  {
    icon: LogIn,
    title: "Login from Chrome, Windows",
    device: "Chrome · Windows 11",
    time: "2 minutes ago",
  },
  {
    icon: KeyRound,
    title: "Added new password",
    device: "GitHub · Kyphora App",
    time: "1 hour ago",
  },
  {
    icon: RefreshCw,
    title: "Updated vault item",
    device: "AWS Console · iOS App",
    time: "Yesterday",
  },
  {
    icon: ShieldCheck,
    title: "Changed security settings",
    device: "Kyphora App · macOS",
    time: "2 days ago",
  },
];

const ActivityTimeline = ({ items = defaultActivity }) => {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/5 p-5 sm:p-6">
      <h3 className="text-base font-semibold text-white">Recent Activity</h3>

      <div className="relative mt-5">
        <div className="absolute bottom-2 left-4 top-2 w-px bg-white/[0.08]" />
        <div className="space-y-5">
          {items.map(({ icon: Icon, title, device, time }, i) => (
            <div key={i} className="relative flex gap-4 pl-0">
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-[#0F172A] text-[#60A5FA]">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1 pb-0.5">
                <p className="text-sm font-medium text-white">{title}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-[#94A3B8]">
                  <span className="truncate">{device}</span>
                  <span>·</span>
                  <span className="shrink-0">{time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
