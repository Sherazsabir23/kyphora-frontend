import { useEffect, useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  createCard,
  updateCard,
} from "../../services/card.service";

const initialState = {
  cardName: "",
  cardHolderName: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  bankName: "",
  cardType: "Visa",
  
};

const cardTypes = [
  "Visa",
  "Mastercard",
  "Amex",
  "other",
];

const AddEditCardModal = ({
  open,
  onClose,
  editingCard,
  refreshCards,
}) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingCard) {
      setForm({
        cardName: editingCard.cardName || "",
        cardHolderName: editingCard.cardHolderName || "",
        cardNumber: editingCard.cardNumber || "",
        expiryMonth: editingCard.expiryMonth || "",
        expiryYear: editingCard.expiryYear || "",
        cvv: editingCard.cvv || "",
        bankName: editingCard.bankName || "",
        cardType: editingCard.cardType || "Visa",
        
      });
    } else {
      setForm(initialState);
    }
  }, [editingCard]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (name === "cardNumber") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }

    if (name === "expiryMonth") {
      newValue = value.replace(/\D/g, "").slice(0, 2);
    }

    if (name === "expiryYear") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
    }

    if (name === "cvv") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const temp = {};

    if (!form.cardName.trim())
      temp.cardName = "Card name is required.";

    if (!form.cardHolderName.trim())
      temp.cardHolderName =
        "Card holder name is required.";

    if (
      form.cardNumber.replace(/\s/g, "").length !== 16
    )
      temp.cardNumber =
        "Enter a valid 16-digit card number.";

    if (form.expiryMonth.length !== 2)
      temp.expiryMonth = "Enter expiry month.";

    if (form.expiryYear.length !== 4)
      temp.expiryYear = "Enter expiry year.";

    if (
      form.cvv.length < 3 ||
      form.cvv.length > 4
    )
      temp.cvv = "Enter a valid CVV.";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        ...form,
        cardNumber: form.cardNumber.replace(
          /\s/g,
          ""
        ),
      };

      if (editingCard) {
        await updateCard(
          editingCard._id,
          payload
        );

        toast.success(
          "Card updated successfully."
        );
      } else {
        await createCard(payload);

        toast.success(
          "Card created successfully."
        );
      }

      refreshCards();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <h2 className="text-xl font-semibold text-white">
              {editingCard
                ? "Edit Credit Card"
                : "Add Credit Card"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Store your card details securely.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Card Name */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Card Name
            </label>

            <input
              type="text"
              name="cardName"
              value={form.cardName}
              onChange={handleChange}
              placeholder="Personal Visa"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.cardName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.cardName}
              </p>
            )}

          </div>

          {/* Card Holder */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Card Holder Name
            </label>

            <input
              type="text"
              name="cardHolderName"
              value={form.cardHolderName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.cardHolderName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.cardHolderName}
              </p>
            )}

          </div>

          {/* Card Number */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Card Number
            </label>

            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-400">
                {errors.cardNumber}
              </p>
            )}

          </div>

          {/* Expiry + CVV */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Expiry Month
              </label>

              <input
                type="text"
                name="expiryMonth"
                value={form.expiryMonth}
                onChange={handleChange}
                placeholder="09"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              {errors.expiryMonth && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.expiryMonth}
                </p>
              )}

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Expiry Year
              </label>

              <input
                type="text"
                name="expiryYear"
                value={form.expiryYear}
                onChange={handleChange}
                placeholder="2028"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              {errors.expiryYear && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.expiryYear}
                </p>
              )}

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                CVV
              </label>

              <input
                type="password"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              {errors.cvv && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.cvv}
                </p>
              )}

            </div>

          </div>

          {/* Bank + Card Type */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Bank Name
              </label>

              <input
                type="text"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                placeholder="HBL"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Card Type
              </label>

              <select
                name="cardType"
                value={form.cardType}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                {cardTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

            </div>

          </div>

          

          {/* Footer */}

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">

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
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
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
                  {editingCard
                    ? "Update Card"
                    : "Save Card"}
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddEditCardModal;