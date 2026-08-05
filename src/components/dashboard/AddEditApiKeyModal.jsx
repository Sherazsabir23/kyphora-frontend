import { useEffect, useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  createApiKey,
  updateApiKey,
} from "../../services/apiKeyService";

const initialState = {
  service: "",
  key: "",
};

const AddEditApiKeyModal = ({
  open,
  onClose,
  editingApiKey,
  refreshApiKeys,
}) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingApiKey) {
      setForm({
        service: editingApiKey.service || "",
        key: editingApiKey.key || "",
      });
    } else {
      setForm(initialState);
    }
  }, [editingApiKey]);

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

    if (!form.service.trim()) {
      temp.service = "Service name is required.";
    }

    if (!form.key.trim()) {
      temp.key = "API key is required.";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      if (editingApiKey) {
        await updateApiKey(editingApiKey._id, form);
        toast.success("API key updated successfully.");
      } else {
        await createApiKey(form);
        toast.success("API key created successfully.");
      }

      refreshApiKeys();

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
      <div className="my-8 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <h2 className="text-xl font-semibold text-white">
              {editingApiKey ? "Edit API Key" : "Add API Key"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Store your API credentials securely.
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
          className="flex-1 space-y-5 overflow-y-auto p-6"
        >

          {/* Service */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Service Name
            </label>

            <input
              type="text"
              name="service"
              value={form.service}
              onChange={handleChange}
              placeholder="Stripe, OpenAI, AWS..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.service && (
              <p className="mt-1 text-sm text-red-400">
                {errors.service}
              </p>
            )}

          </div>

          {/* API Key */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              API Key
            </label>

            <textarea
              rows={5}
              name="key"
              value={form.key}
              onChange={handleChange}
              placeholder="Paste your API key here..."
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 font-mono text-white outline-none focus:border-blue-500"
            />

            {errors.key && (
              <p className="mt-1 text-sm text-red-400">
                {errors.key}
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
                  {editingApiKey
                    ? "Update API Key"
                    : "Save API Key"}
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddEditApiKeyModal;