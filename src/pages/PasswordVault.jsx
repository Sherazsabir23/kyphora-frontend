import { useMemo, useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Pencil,
  Trash2,
  Globe,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  getPasswords,
  getPassword,
  deletePassword,
} from "../services/password.service";
import toast from "react-hot-toast";
import AddEditPasswordModal from "../components/dashboard/AddEditPasswordModal";

const categories = ["All", "Work", "Personal", "Finance", "Social", "Other"];

const PasswordVault = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const [passwords, setPasswords] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [visible, setVisible] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      setLoading(true);

      const res = await getPasswords();

      setPasswords(res.data.data);

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch passwords."
      );
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return passwords.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.username.toLowerCase().includes(query.toLowerCase()) ||
        item.website.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [passwords, query, category]);

  // ===========================
  // Add
  // ===========================

  const handleAdd = () => {
    setEditingPassword(null);
    setModalOpen(true);
  };

  // ===========================
  // Edit
  // ===========================

  const handleEdit = async (id) => {
    try {
      const res = await getPassword(id);

      setEditingPassword(res.data.data);

      setModalOpen(true);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to load password."
      );
    }
  };

  // ===========================
  // Delete
  // ===========================

 const handleDelete = async (id) => {
  const result = await Swal.fire({
     title: "Delete Password?",
  text: "You won't be able to recover this password.",
  icon: "warning",
  width: "360px", // 👈 size chota
  padding: "1.5rem",
  showCancelButton: true,
  confirmButtonColor: "#EF4444",
  cancelButtonColor: "#334155",
  confirmButtonText: "Yes, Delete",
  cancelButtonText: "Cancel",
  background: "#0F172A",
  color: "#fff",
  });

  if (!result.isConfirmed) return;

  try {
    await deletePassword(id);

    fetchPasswords();

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Password deleted successfully.",
      timer: 1800,
      showConfirmButton: false,
      background: "#0F172A",
      color: "#fff",
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        err.response?.data?.message ||
        "Failed to delete password.",
      background: "#0F172A",
      color: "#fff",
    });
  }
};

  // ===========================
  // Eye
  // ===========================

  const toggleVisible = async (id) => {
    if (visible[id]) {
      setVisible((prev) => {
        const temp = { ...prev };
        delete temp[id];
        return temp;
      });

      return;
    }

    try {
      const res = await getPassword(id);

      setVisible((prev) => ({
        ...prev,
        [id]: res.data.data.password,
      }));
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to decrypt password."
      );
    }
  };

  // ===========================
  // Copy
  // ===========================

  const handleCopy = async (id) => {
    try {
      let password = visible[id];

      if (!password) {
        const res = await getPassword(id);

        password = res.data.data.password;
      }

      await navigator.clipboard.writeText(password);

      alert("Password copied.");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to copy password."
      );
    }
  };
    if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-gray-400">Loading passwords...</p>
      </div>
    );
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
            <h1 className="text-2xl font-bold text-white">
              Password Vault
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              {passwords.length} Passwords Saved
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Plus size={18} />
            Add Password
          </button>

        </div>

        {/* Search + Filter */}

        <div className="flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search passwords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
            />

          </div>

          <div className="relative">

            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            >
              {category}
              <ChevronDown size={16} />
            </button>

            {filterOpen && (

              <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-slate-700 bg-slate-900 p-2">

                {categories.map((cat) => (

                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setFilterOpen(false);
                    }}
                    className={`block w-full rounded-lg px-3 py-2 text-left transition

                    ${
                      category === cat
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {cat}
                  </button>

                ))}

              </div>

            )}

          </div>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[750px]">

              <thead>

                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-400">

                  <th className="px-5 py-4">Website</th>

                  <th className="px-5 py-4">Username</th>

                  <th className="px-5 py-4">Password</th>

                  <th className="px-5 py-4">Updated</th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.length === 0 ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="py-16 text-center text-slate-500"
                    >
                      No passwords found.
                    </td>

                  </tr>

                ) : (

                  filtered.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b border-slate-800 hover:bg-slate-800/40"
                    >

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="rounded-lg bg-blue-600/20 p-2 text-blue-400">

                            <Globe size={18} />

                          </div>

                          <div>

                            <p className="font-medium text-white">
                              {item.title}
                            </p>

                            <p className="text-xs text-slate-400">
                              {item.website}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-slate-300">
                        {item.username}
                      </td>

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <span className="font-mono text-white">

                            {visible[item._id]
                              ? visible[item._id]
                              : "••••••••••"}

                          </span>

                          <button
                            onClick={() =>
                              toggleVisible(item._id)
                            }
                          >
                            {visible[item._id] ? (
                              <EyeOff
                                size={17}
                                className="text-slate-400 hover:text-white"
                              />
                            ) : (
                              <Eye
                                size={17}
                                className="text-slate-400 hover:text-white"
                              />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              handleCopy(item._id)
                            }
                          >
                            <Copy
                              size={17}
                              className="text-slate-400 hover:text-white"
                            />
                          </button>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-slate-400">

                        {new Date(
                          item.updatedAt
                        ).toLocaleDateString()}

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              handleEdit(item._id)
                            }
                            className="rounded-lg p-2 hover:bg-slate-700"
                          >
                            <Pencil
                              size={18}
                              className="text-slate-300"
                            />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item._id)
                            }
                            className="rounded-lg p-2 hover:bg-red-600/20"
                          >
                            <Trash2
                              size={18}
                              className="text-red-400"
                            />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      <AddEditPasswordModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingPassword(null);
        }}
        editingPassword={editingPassword}
        refreshPasswords={fetchPasswords}
      />
    </>
  );
};

export default PasswordVault;