import { useEffect, useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  createPassword,
  updatePassword,
} from "../../services/password.service";

const initialState = {
  title: "",
  website: "",
  username: "",
  password: "",
  category: "Personal",
  notes: "",
};

const categories = [
  "Work",
  "Personal",
  "Finance",
  "Social",
  "Other",
];

const AddEditPasswordModal = ({
  open,
  onClose,
  editingPassword,
  refreshPasswords,
}) => {
  const [form, setForm] = useState(initialState);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPassword) {
      setForm({
        title: editingPassword.title || "",
        website: editingPassword.website || "",
        username: editingPassword.username || "",
        password: editingPassword.password || "",
        category: editingPassword.category || "Personal",
        notes: editingPassword.notes || "",
      });
    } else {
      setForm(initialState);
    }
  }, [editingPassword]);

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
      temp.title = "Title is required";

    if (!form.website.trim())
      temp.website = "Website is required";

    if (!form.username.trim())
      temp.username = "Username is required";

    if (!form.password.trim())
      temp.password = "Password is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    setLoading(true);

    if (editingPassword) {
      await updatePassword(editingPassword._id, form);

      toast.success("Password updated successfully.");
    } else {
      await createPassword(form);

      toast.success("Password added successfully.");
    }

    refreshPasswords();

    onClose();

    setForm(initialState);
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Something went wrong."
    );
  } finally {
    setLoading(false);
  }
};
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <h2 className="text-xl font-semibold text-white">
              {editingPassword ? "Edit Password" : "Add New Password"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Store your credentials securely.
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

        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-90px)] overflow-y-auto space-y-5 p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">

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
              placeholder="GitHub"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-400">
                {errors.title}
              </p>
            )}

          </div>

          {/* Website */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Website
            </label>

            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://github.com"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.website && (
              <p className="mt-1 text-sm text-red-400">
                {errors.website}
              </p>
            )}

          </div>

          {/* Username */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Username / Email
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-400">
                {errors.username}
              </p>
            )}

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password}
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

          {/* Notes */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Notes
            </label>

            <textarea
              rows={4}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Optional notes..."
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

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
                  {editingPassword
                    ? "Update Password"
                    : "Save Password"}
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddEditPasswordModal;