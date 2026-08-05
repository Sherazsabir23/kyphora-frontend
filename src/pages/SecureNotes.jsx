import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  StickyNote,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import PageLoader from "../components/common/PageLoader";
import AddEditNoteModal from "../components/dashboard/AddEditNoteModal";
import ViewNoteModal from "../components/dashboard/ViewNoteModal";
import EmptyState from "../components/dashboard/EmptyState"
import {
  getNote,
  getNotes,
  deleteNote,
} from "../services/note.service";

const SecureNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

const maskContent = () => "••••••••";
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(notes.map((note) => note.category)),
    ];
  }, [notes]);

  const fetchNotes = async () => {

    try {
      setLoading(true);

      const res = await getNotes();

      setNotes(res.data.data);

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to fetch notes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filtered = useMemo(() => {
    return notes.filter((note) => {
      const matchesQuery =
        note.title
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchesCategory =
        category === "All" ||
        note.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [notes, query, category]);

  const handleCreate = () => {
    setEditingNote(null);
    setOpenModal(true);
  };

  const handleEdit = async (note) => {
    try {
      const res = await getNote(note._id);

      setEditingNote(res.data.data);

      setOpenModal(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to load note."
      );
    }
  };
  const handleClose = () => {
    setEditingNote(null);
    setOpenModal(false);
  };

 const handleDelete = async (id) => {
   console.log("Delete clicked", id);
  const result = await Swal.fire({
    title: "Delete Note?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#EF4444",
    cancelButtonColor: "#334155",
    background: "#0F172A",
    color: "#fff",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteNote(id);

    await Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Note deleted successfully.",
      timer: 1800,
      showConfirmButton: false,
      background: "#0F172A",
      color: "#fff",
    });

    fetchNotes();
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        err.response?.data?.message ||
        "Failed to delete note.",
      background: "#0F172A",
      color: "#fff",
    });
  }
};
const handleView = async (note) => {
  try {
    const res = await getNote(note._id);

    setSelectedNote(res.data.data);

    setViewOpen(true);
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Failed to load note."
    );
  }
};
  if (loading) {
    return <PageLoader text="Loading notes..." />;
  }

  if (error) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Secure Notes
            </h1>

            <p className="mt-1 text-sm text-[#94A3B8]">
              {notes.length} notes stored securely
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
          >
            <Plus className="h-4 w-4" />
            Create Note
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full rounded-xl border border-white/[0.08] bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#94A3B8]/60 outline-none transition-colors focus:border-[#3B82F6]/60"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${category === cat
                  ? "border-[#3B82F6]/40 bg-[#3B82F6]/15 text-white"
                  : "border-white/[0.08] bg-white/5 text-[#94A3B8] hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

       {notes.length === 0 ? (
  <EmptyState
    heading="No secure notes yet"
    description="Create your first encrypted note to safely store passwords, recovery codes, ideas, or any confidential information."
    actionLabel="Create First Note"
    onAction={handleCreate}
  />
) : (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {filtered.map((note) => (
      <div
        key={note._id}
        className="group flex flex-col rounded-2xl border border-white/[0.08] bg-white/5 p-5 transition-colors hover:border-[#3B82F6]/40"
      >
        <div className="flex items-start justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
            <StickyNote className="h-4.5 w-4.5" />
          </span>

          <div className="flex items-center gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
            <button
              onClick={() => handleView(note)}
              className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-white/5 hover:text-white"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => handleEdit(note)}
              className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-white/5 hover:text-white"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => handleDelete(note._id)}
              className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#EF4444]/10 hover:text-[#EF4444]"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <h3 className="mt-4 text-sm font-semibold text-white">
          {note.title}
        </h3>

        <p className="mt-1.5 flex-1 font-mono text-xs leading-relaxed text-[#94A3B8] line-clamp-3 break-all">
  <p className="mt-1.5 flex-1 font-mono text-xs leading-relaxed tracking-widest text-[#94A3B8]">
  {maskContent()}
</p>
</p>

        <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
          <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] text-[#94A3B8]">
            {note.category}
          </span>

          <span className="text-[10px] text-[#94A3B8]">
            {new Date(note.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    ))}

    {filtered.length === 0 && (
      <div className="col-span-full rounded-2xl border border-dashed border-white/[0.12] py-14 text-center text-sm text-[#94A3B8]">
        No notes match your search.
      </div>
    )}
  </div>
)}
      </div>

      <AddEditNoteModal
        open={openModal}
        onClose={handleClose}
        editingNote={editingNote}
        refreshNotes={fetchNotes}
      />
      <ViewNoteModal
        open={viewOpen}
        note={selectedNote}
        onClose={() => {
          setViewOpen(false);
          setSelectedNote(null);
        }}
      />
    </>

  );
};

export default SecureNotes;