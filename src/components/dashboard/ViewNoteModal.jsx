import { X, StickyNote, CalendarDays, Tag } from "lucide-react";

const ViewNoteModal = ({ open, note, onClose }) => {
  if (!open || !note) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-8 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <StickyNote className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Secure Note
              </h2>

              <p className="text-sm text-slate-400">
                View your stored note
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

      <div className="flex-1 space-y-6 overflow-y-auto p-6">

          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
              Title
            </p>

            <h3 className="text-lg font-semibold text-white">
              {note.title}
            </h3>
          </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <Tag size={16} />
                <span className="text-xs uppercase">
                  Category
                </span>
              </div>

              <p className="text-sm font-medium text-white">
                {note.category}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <CalendarDays size={16} />
                <span className="text-xs uppercase">
                  Updated
                </span>
              </div>

              <p className="text-sm font-medium text-white">
                {new Date(note.updatedAt).toLocaleString()}
              </p>
            </div>

          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">
              Note
            </p>

            <div className="max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-slate-900 p-5">
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-300">
                {note.content}
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-white/10 p-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-white transition hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNoteModal;