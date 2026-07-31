import { Plus, MoreVertical, Wifi } from "lucide-react";

const cards = [
  {
    id: 1,
    label: "Kyphora Business",
    type: "Visa",
    last4: "4821",
    expiry: "09/28",
    gradient: "from-[#3B82F6] to-[#1E3A8A]",
  },
  {
    id: 2,
    label: "Personal Everyday",
    type: "Mastercard",
    last4: "7734",
    expiry: "03/27",
    gradient: "from-[#60A5FA] to-[#0F172A]",
  },
  {
    id: 3,
    label: "Travel Rewards",
    type: "Amex",
    last4: "1092",
    expiry: "12/29",
    gradient: "from-[#0F172A] to-[#3B82F6]",
  },
];

const CreditCards = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Credit Cards</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {cards.length} cards saved securely
          </p>
        </div>
        <button className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]">
          <Plus className="h-4 w-4" />
          Add Card
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.id} className="rounded-2xl border border-white/[0.08] bg-white/5 p-4">
            <div
              className={`relative aspect-[1.6/1] w-full overflow-hidden rounded-xl bg-gradient-to-br ${card.gradient} p-5 shadow-lg`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-white/80">
                  {card.type}
                </span>
                <Wifi className="h-4 w-4 rotate-90 text-white/70" />
              </div>
              <p className="mt-6 font-mono text-lg tracking-[0.2em] text-white sm:text-xl">
                •••• •••• •••• {card.last4}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-white/60">Card Holder</p>
                  <p className="text-xs font-medium text-white">Jordan Lee</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-wide text-white/60">Expires</p>
                  <p className="text-xs font-medium text-white">{card.expiry}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white">{card.label}</p>
              <button className="rounded-lg p-1.5 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white" aria-label="Card options">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditCards;
