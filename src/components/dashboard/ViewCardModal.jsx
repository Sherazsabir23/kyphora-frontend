import {
  X,
  CreditCard,
  CalendarDays,
  User,
  Shield,
  BadgeInfo,
} from "lucide-react";

const ViewCardModal = ({ open, card, onClose }) => {
  if (!open || !card) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm"
    >
     <div className="flex min-h-screen items-end justify-center p-2 sm:items-center sm:p-4">

  <div
    onClick={(e) => e.stopPropagation()}
    className="
      w-full
      max-w-2xl
      rounded-2xl
      border
      border-white/10
      bg-[#0F172A]
      shadow-2xl
      max-h-[95vh]
      overflow-y-auto
      scrollbar-thin
      scrollbar-thumb-slate-700
      scrollbar-track-transparent
    "
  >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 sm:h-11 sm:w-11">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>

                <h2 className="text-lg sm:text-xl">
                  Credit Card
                </h2>

                <p className="text-sm text-slate-400">
                  Securely stored card details
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <X size={20} />
            </button>

          </div>

          {/* Body */}

          <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">

            {/* Card Preview */}

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1E3A8A] p-4 sm:p-6 shadow-xl">

              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

              <div className="flex items-center justify-between">

                <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  {card.cardType}
                </span>

                <CreditCard className="h-5 w-5 text-white/80" />

              </div>

              <p className="mt-6 break-all font-mono text-base tracking-[0.12em] text-white sm:mt-8 sm:text-xl sm:tracking-[0.18em]">
                {card.cardNumber}
              </p>

              <div className="mt-8 flex justify-between">

                <div>

                  <p className="text-sm font-medium text-white">
                    Card Holder
                  </p>

                 <p className="text-xs font-medium text-white sm:text-sm">
                    {card.cardHolder}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-[10px] uppercase text-white/60">
                    Expires
                  </p>

                  <p className="text-sm font-medium text-white">
                    {card.expiryMonth}/{card.expiryYear}
                  </p>

                </div>

              </div>

            </div>

            {/* Details */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 sm:p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-400">
                  <BadgeInfo size={16} />
                  <span className="text-xs uppercase">
                    Label
                  </span>
                </div>

                <p className="text-sm font-medium text-white">
                  {card.cardName}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 sm:p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-400">
                  <User size={16} />
                  <span className="text-xs uppercase">
                    Card Holder
                  </span>
                </div>

                <p className="text-sm font-medium text-white">
                  {card.cardHolderName}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 sm:p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-400">
                  <Shield size={16} />
                  <span className="text-xs uppercase">
                    CVV
                  </span>
                </div>

                <p className="font-mono text-lg text-white">
                  {card.cvv}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3 sm:p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-400">
                  <CalendarDays size={16} />
                  <span className="text-xs uppercase">
                    Updated
                  </span>
                </div>

                <p className="text-sm font-medium text-white">
                  {new Date(card.updatedAt).toLocaleString()}
                </p>
              </div>

            </div>

          </div>

          {/* Footer */}

         <div className="flex justify-end border-t border-white/10 p-4 sm:p-5">

            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-2.5 text-white transition hover:bg-white/5"
            >
              Close
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewCardModal;