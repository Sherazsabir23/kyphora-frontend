import { useEffect, useRef, useState } from "react";
import {
  Upload,
  FileText,
  FileImage,
  FileSpreadsheet,
  Download,
  Trash2,
  Eye,
} from "lucide-react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import PageLoader from "../components/common/PageLoader";

import {
  getDocuments,
  createDocument,
  deleteDocument,
  downloadDocument,
    previewDocument,
} from "../services/document.service";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const res = await getDocuments();

      setDocuments(res.data.data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const getFileIcon = (mimeType) => {
    if (mimeType?.startsWith("image")) return FileImage;

    if (mimeType === "application/pdf") return FileText;

    if (
      mimeType?.includes("excel") ||
      mimeType?.includes("sheet")
    ) {
      return FileSpreadsheet;
    }

    return FileText;
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("document", file);

      await createDocument(formData);

      toast.success("Document uploaded successfully.");

      fetchDocuments();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to upload document."
      );
    }

    e.target.value = "";
  };
const handlePreview = async (id) => {
  try {
    const res = await previewDocument(id);

    const blob = new Blob([res.data], {
      type: res.headers["content-type"],
    });

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  } catch (err) {
    console.error(err);
    toast.error("Unable to preview document.");
  }
};
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Document?",
      text: "You won't be able to recover this document.",
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
      await deleteDocument(id);

      fetchDocuments();

      toast.success("Document deleted successfully.");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to delete document."
      );
    }
  };

  const handleDownload = async (id, name) => {
    try {
      const res = await downloadDocument(id);

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = name;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Unable to download file.");
    }
  };

  if (loading) {
    return <PageLoader text="Loading documents..." />;
  }

  if (error) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx"
        onChange={handleUpload}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-xl font-semibold text-white">
            Documents
          </h1>

          <p className="mt-1 text-sm text-[#94A3B8]">
            {documents.length} files stored securely
          </p>
        </div>

        <button
          onClick={handleChooseFile}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
        >
          <Upload className="h-4 w-4" />
          Upload Document
        </button>

      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.15] bg-white/[0.02] px-6 py-16 text-center">

          <Upload className="mb-4 h-12 w-12 text-[#60A5FA]" />

          <h3 className="text-lg font-semibold text-white">
            No Documents Yet
          </h3>

          <p className="mt-2 text-sm text-[#94A3B8]">
            Upload your first document to store it securely.
          </p>

          <button
            onClick={handleChooseFile}
            className="mt-6 rounded-xl bg-[#3B82F6] px-5 py-2.5 font-medium text-white hover:bg-[#60A5FA]"
          >
            Upload Document
          </button>

        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.08] bg-white/5">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[560px] text-left text-sm">

              <thead>
                <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-[#94A3B8]">
                  <th className="px-4 py-3">File</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Date Uploaded</th>
                  <th className="px-4 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {documents.map((doc) => {
                  const Icon = getFileIcon(doc.mimetype);

                  return (
                    <tr
                      key={doc._id}
                      className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">
                            <Icon className="h-4 w-4" />
                          </span>

                          <span className="font-medium text-white">
                            {doc.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-[#94A3B8]">
                     {doc.type}
                      </td>

                      <td className="px-4 py-3.5 text-[#94A3B8]">
                        {(doc.size)}
                      </td>

                      <td className="px-4 py-3.5 text-[#94A3B8]">
                        {new Date(
                          doc.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3.5">

                        <div className="flex justify-end gap-1">
<button
  onClick={() => handlePreview(doc._id)}
  className="rounded-lg p-2 text-[#94A3B8] hover:bg-white/5 hover:text-white"
>
  <Eye className="h-4 w-4" />
</button>
                          <button
                            onClick={() =>
                              handleDownload(
                                doc._id,
                                doc.name
                              )
                            }
                            className="rounded-lg p-2 text-[#94A3B8] hover:bg-white/5 hover:text-white"
                          >
                            <Download className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(doc._id)
                            }
                            className="rounded-lg p-2 text-[#94A3B8] hover:bg-red-500/10 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>

                      </td>
                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>
      )}
    </div>
  );
};

export default Documents;