import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import {
  Plus,
  Wifi,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  getCards,
  getCard,

  deleteCard,
} from "../services/card.service";
import AddEditCardModal from "../components/dashboard/AddEditCardModal";
import ViewCardModal from "../components/dashboard/ViewCardModal";
import PageLoader from "../components/common/PageLoader";
import EmptyState from "../components/dashboard/EmptyState";

const CreditCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);

      const res = await getCards();

      setCards(res.data.data);

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to fetch cards."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Card?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#EF4444",
      background: "#0F172A",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCard(id);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Card deleted successfully.",
        timer: 1800,
        showConfirmButton: false,
        background: "#0F172A",
        color: "#fff",
      });

      fetchCards();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.response?.data?.message ||
          "Failed to delete card.",
        background: "#0F172A",
        color: "#fff",
      });
    }
  };
  const handleView = async (card) => {
    try {
      const res = await getCard(card._id);

      setSelectedCard(res.data.data);

      setViewOpen(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to load card."
      );
    }
  };
  const handleEdit = async (card) => {
    try {
      const res = await getCard(card._id);

      setEditingCard(res.data.data);

      setOpenModal(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to load card."
      );
    }
  };

  const handleClose = () => {
    setEditingCard(null);
    setOpenModal(false);
  };
  useEffect(() => {
    fetchCards();
  }, []);

  if (loading) {
    return <PageLoader text="Loading cards..." />;
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

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-xl font-semibold text-white">
            Credit Cards
          </h1>

          <p className="mt-1 text-sm text-[#94A3B8]">
            {cards.length} cards saved securely
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_8px_24px_-8px_rgba(59,130,246,0.7)] transition-colors hover:bg-[#60A5FA]"
        >
          <Plus className="h-4 w-4" />
          Add Card
        </button>

      </div>

      {/* Empty */}

      {cards.length === 0 ? (
        <EmptyState
          heading="No cards saved yet"
          description="Store your debit and credit cards securely with military-grade encryption."
          actionLabel="Add First Card"
          onAction={() => setOpenModal(true)}
        />
      ) : (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {cards.map((card) => (

            <div
              key={card._id}
              className="group rounded-2xl border border-white/[0.08] bg-white/5 p-4"
            >

              <div
                className={`relative aspect-[1.6/1] w-full overflow-hidden rounded-xl bg-gradient-to-br ${card.gradient ||
                  "from-[#3B82F6] to-[#1E3A8A]"
                  } p-5 shadow-lg`}
              >

                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                <div className="flex items-start justify-between">

                  <span className="text-xs font-medium uppercase tracking-widest text-white/80">
                    {card.cardType}
                  </span>

                  <Wifi className="h-4 w-4 rotate-90 text-white/70" />

                </div>

                <p className="mt-6 font-mono text-lg tracking-[0.2em] text-white sm:text-xl">
                  •••• •••• •••• {card.last4}
                </p>

                <div className="mt-4 flex items-end justify-between">

                  <div>

                    <p className="text-[9px] uppercase tracking-wide text-white/60">
                      Card Holder
                    </p>

                  <p className="text-xs font-medium text-white">
  {card.cardHolderName}
</p>

                  </div>

                  <div className="text-right">

                    <p className="text-[9px] uppercase tracking-wide text-white/60">
                      Expires
                    </p>

                    <p className="text-xs font-medium text-white">
                      {card.expiryMonth}/{card.expiryYear}
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-4 flex items-center justify-between">
<p className="text-sm font-medium text-white">
  {card.cardName}
</p>
                <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">

                  <button
                    onClick={() => handleView(card)}
                    className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-white/5 hover:text-white"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleEdit(card)}
                    className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-white/5 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(card._id)}
                    className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}
      <AddEditCardModal
        open={openModal}
        onClose={handleClose}
        editingCard={editingCard}
        refreshCards={fetchCards}
      />

      <ViewCardModal
        open={viewOpen}
        card={selectedCard}
        onClose={() => {
          setViewOpen(false);
          setSelectedCard(null);
        }}
      />
    </div>
  );
};

export default CreditCards;