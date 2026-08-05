import { useEffect, useState } from "react";
import {
  Code2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { getApiKeys, deleteApiKey } from "../services/apiKeyService";
import AddEditApiKeyModal from "../components/dashboard/AddEditApiKeyModal";
import PageLoader from "../components/common/PageLoader";
import EmptyState from "../components/dashboard/EmptyState";
const maskKey = (key = "") => "•".repeat(Math.max(key.length, 16));
const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [visible, setVisible] = useState({});
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingApiKey, setEditingApiKey] = useState(null);

  const toggleVisible = (id) => {
    setVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

 const fetchApiKeys = async () => {
  try {
    setLoading(true);

    const res = await getApiKeys();

    setApiKeys(res.data); // if your API returns { data: [...] }

    setError("");
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Failed to load API Keys."
    );
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchApiKeys();
  }, []);
  const handleCopy = async (id, key) => {
    try {
      await navigator.clipboard.writeText(key);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      toast.error("Unable to copy API Key.");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete API Key?",
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
      await deleteApiKey(id);

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "API Key deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
        background: "#0F172A",
        color: "#fff",
      });

      fetchApiKeys();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.response?.data?.message ||
          "Failed to delete API Key.",
        background: "#0F172A",
        color: "#fff",
      });
    }
  };

  if (loading) {
    return <PageLoader text="Loading passwords..." />;
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

        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-xl font-semibold text-white">
              API Keys
            </h1>

            <p className="mt-1 text-sm text-[#94A3B8]">
              {apiKeys.length} keys stroed securely.
            </p>

          </div>

          <button
            onClick={() => {
              setEditingApiKey(null);
              setOpenModal(true);
            }}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
          >
            <Plus className="h-4 w-4" />
            Add API Key
          </button>

        </div>

        {/* Table */}

        {apiKeys.length === 0 ? (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.15] bg-white/[0.02] px-6 py-16 text-center">
    <Code2 className="mb-4 h-12 w-12 text-[#60A5FA]" />

    <h3 className="text-lg font-semibold text-white">
      No API Keys Yet
    </h3>

    <p className="mt-2 text-sm text-[#94A3B8]">
      Store your first API key securely.
    </p>

    <button
      onClick={() => {
        setEditingApiKey(null);
        setOpenModal(true);
      }}
      className="mt-6 flex items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 font-medium text-white hover:bg-[#60A5FA]"
    >
      <Plus className="h-4 w-4" />
      Add API Key
    </button>
  </div>
) : (
  <div className="rounded-2xl border border-white/[0.08] bg-white/5">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-[#94A3B8]">
            <th className="px-4 py-3 font-medium">Service</th>
            <th className="px-4 py-3 font-medium">Key</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 text-right font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {apiKeys.map((item) => (
            <tr
              key={item._id}
              className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03]"
            >
               <td className="px-4 py-3.5">

                        <div className="flex items-center gap-3">

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/15 text-[#60A5FA]">

                            <Code2 className="h-4 w-4" />

                          </span>

                          <span className="font-medium text-white">
                            {item.service}
                          </span>

                        </div>

                      </td>

                      <td className="px-4 py-3.5">

                        <div className="flex items-center gap-2">

                          <span className="font-mono text-xs text-white sm:text-sm">

                            {visible[item._id]
                              ? item.key
                              : maskKey(item.key)}

                          </span>

                          <button
                            onClick={() =>
                              toggleVisible(item._id)
                            }
                            className="text-[#94A3B8] transition-colors hover:text-white"
                          >
                            {visible[item._id] ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                          </button>

                          <button
                            onClick={() => handleCopy(item._id, item.key)}
                            className="text-[#94A3B8] transition-colors hover:text-white"
                          >
                            {copiedId === item._id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>

                        </div>

                      </td>

                      <td className="px-4 py-3.5 text-[#94A3B8]">
                        {item.created}
                      </td>

                      <td className="px-4 py-3.5">

                        <div className="flex items-center justify-end gap-1">

                          <button
                            onClick={() => {
                              setEditingApiKey(item);
                              setOpenModal(true);
                            }}
                            className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                         <button
  onClick={() => handleDelete(item._id)}
  className="rounded-lg p-2 text-red-400 transition-colors hover:bg-[#EF4444]/10 hover:text-red-500"
>
  <Trash2 className="h-4 w-4" />
</button>

                        </div>

                      </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

      </div>

      <AddEditApiKeyModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingApiKey(null);
        }}
        editingApiKey={editingApiKey}
        refreshApiKeys={fetchApiKeys}
      />
    </>
  );
};

export default ApiKeys;