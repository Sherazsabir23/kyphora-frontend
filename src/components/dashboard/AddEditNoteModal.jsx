import { useEffect, useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  createNote,
  updateNote,
} from "../../services/note.service";

const initialState = {
  title: "",
  category: "Personal",
  content: "",
};

const categories = [
  "Personal",
  "Work",
  "Finance",
  "Recovery",
];

const AddEditNoteModal = ({
  open,
  onClose,
  editingNote,
  refreshNotes,
}) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingNote) {
      setForm({
        title: editingNote.title || "",
        category: editingNote.category || "Personal",
        content: editingNote.content || "",
      });
    } else {
      setForm(initialState);
    }
  }, [editingNote]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const temp = {};

    if (!form.title.trim())
      temp.title = "Title is required.";

    if (!form.content.trim())
      temp.content = "Content is required.";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      if (editingNote) {
        await updateNote(editingNote._id, form);

        toast.success("Note updated successfully.");
      } else {
        await createNote(form);

        toast.success("Note created successfully.");
      }

      refreshNotes();

      onClose();

      setForm(initialState);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
     <div className="my-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <h2 className="text-xl font-semibold text-white">
              {editingNote
                ? "Edit Secure Note"
                : "Create Secure Note"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Store sensitive information securely.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}

      <form
  onSubmit={handleSubmit}
  className="flex-1 overflow-y-auto space-y-5 p-6"
>
          {/* Title */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Server Credentials"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-400">
                {errors.title}
              </p>
            )}

          </div>

          {/* Category */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

          </div>

          {/* Content */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Content
            </label>

            <textarea
              rows={8}
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your secure note here..."
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.content && (
              <p className="mt-1 text-sm text-red-400">
                {errors.content}
              </p>
            )}

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-5 py-3 text-white transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {editingNote
                    ? "Update Note"
                    : "Save Note"}
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddEditNoteModal;