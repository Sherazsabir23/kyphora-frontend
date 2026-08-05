import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import {
  createDocument,
  updateDocument,
} from "../../services/document.service";

const AddEditDocumentModal = ({
  open,
  onClose,
  editingDocument,
  refreshDocuments,
}) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingDocument) {
      setName(editingDocument.name);
      setFile(null);
    } else {
      setTitle("");
      setFile(null);
    }
  }, [editingDocument]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Document title is required.");
    }

    if (!editingDocument && !file) {
      return toast.error("Please select a document.");
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", title);

      if (file) {
        formData.append("document", file);
      }

      if (editingDocument) {
        await updateDocument(editingDocument._id, formData);
        toast.success("Document updated successfully.");
      } else {
        await createDocument(formData);
        toast.success("Document uploaded successfully.");
      }

      refreshDocuments();

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

          <h2 className="text-lg font-semibold text-white">
            {editingDocument
              ? "Edit Document"
              : "Upload Document"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* Document Name */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Document Name
            </label>

            <input
              type="text"
              placeholder="Passport Scan"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* File */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Select File
            </label>

            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-600 bg-slate-800 px-4 py-8 text-slate-300 transition hover:border-blue-500">

              <Upload className="h-5 w-5" />

              <span>
                {file
                  ? file.name
                  : editingDocument
                  ? "Choose another file (optional)"
                  : "Choose File"}
              </span>

              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

            </label>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-5 py-2.5 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingDocument
                ? "Update"
                : "Upload"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddEditDocumentModal;