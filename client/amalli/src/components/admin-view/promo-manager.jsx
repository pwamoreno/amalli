import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Plus, Gift, Trash2, Edit, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import {
  getAllPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
} from "@/store/admin/promo-slice";

const AdminPromoCodeManager = () => {
  const dispatch = useDispatch();
  const { promoCodes, isLoading } = useSelector((state) => state.adminPromo);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minPurchase: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
    isActive: true,
    applicableFor: "all",
    description: "",
  });

  // Fetch promo codes on component mount
  useEffect(() => {
    dispatch(getAllPromoCodes());
  }, [dispatch]);

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code });
  };

  const handleSubmit = () => {
    if (!formData.code || !formData.discountValue) {
      toast("Please fill in required fields", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    // Clean up empty fields
    const cleanedData = {
      code: formData.code,
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      minPurchase: formData.minPurchase ? Number(formData.minPurchase) : 0,
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
      usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
      expiryDate: formData.expiryDate || null,
      isActive: formData.isActive,
      applicableFor: formData.applicableFor,
      description: formData.description,
    };

    if (editingId) {
      // Update existing promo code
      dispatch(updatePromoCode({ id: editingId, promoData: cleanedData }))
        .unwrap()
        .then(() => {
          toast("Promo code updated successfully", {
            style: { background: "#10b981", color: "white" },
          });
          resetForm();
        })
        .catch((error) => {
          toast(error.message || "Failed to update promo code", {
            style: { background: "#fa113d", color: "white" },
          });
        });
    } else {
      // Create new promo code
      dispatch(createPromoCode(cleanedData))
        .unwrap()
        .then(() => {
          toast("Promo code created successfully", {
            style: { background: "#10b981", color: "white" },
          });
          resetForm();
        })
        .catch((error) => {
          toast(error.message || "Failed to create promo code", {
            style: { background: "#fa113d", color: "white" },
          });
        });
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minPurchase: "",
      maxDiscount: "",
      usageLimit: "",
      expiryDate: "",
      isActive: true,
      applicableFor: "all",
      description: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (promo) => {
    setFormData({
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      minPurchase: promo.minPurchase || "",
      maxDiscount: promo.maxDiscount || "",
      usageLimit: promo.usageLimit || "",
      expiryDate: promo.expiryDate ? promo.expiryDate.split("T")[0] : "",
      isActive: promo.isActive,
      applicableFor: promo.applicableFor,
      description: promo.description || "",
    });
    setEditingId(promo._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this promo code?")) {
      dispatch(deletePromoCode(id))
        .unwrap()
        .then(() => {
          toast("Promo code deleted successfully", {
            style: { background: "#10b981", color: "white" },
          });
        })
        .catch((error) => {
          toast(error.message || "Failed to delete promo code", {
            style: { background: "#fa113d", color: "white" },
          });
        });
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast("Code copied to clipboard", {
      style: { background: "#10b981", color: "white" },
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="w-6 h-6" />
          Promo Code Manager
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Create Promo Code
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Promo Code *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="SUMMER2024"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  title="Generate Random Code"
                  disabled={isLoading}
                >
                  <Gift className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Discount Type *
              </label>
              <select
                value={formData.discountType}
                onChange={(e) =>
                  setFormData({ ...formData, discountType: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                disabled={isLoading}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₦)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Discount Value *
              </label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) =>
                  setFormData({ ...formData, discountValue: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder={
                  formData.discountType === "percentage" ? "10" : "5000"
                }
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Minimum Purchase (₦)
              </label>
              <input
                type="number"
                value={formData.minPurchase}
                onChange={(e) =>
                  setFormData({ ...formData, minPurchase: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="0"
                disabled={isLoading}
              />
            </div>

            {formData.discountType === "percentage" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Max Discount (₦)
                </label>
                <input
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) =>
                    setFormData({ ...formData, maxDiscount: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="10000"
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                value={formData.usageLimit}
                onChange={(e) =>
                  setFormData({ ...formData, usageLimit: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Unlimited"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Applicable For
              </label>
              <select
                value={formData.applicableFor}
                onChange={(e) =>
                  setFormData({ ...formData, applicableFor: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                disabled={isLoading}
              >
                <option value="all">All Users</option>
                <option value="registered">Registered Users Only</option>
                <option value="guest">Guest Users Only</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                rows="2"
                placeholder="Summer sale discount for all users"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4"
                disabled={isLoading}
              />
              <label className="text-sm font-medium">Active</label>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : editingId
                ? "Update Promo Code"
                : "Create Promo Code"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading && !showForm ? (
          <div className="px-4 py-8 text-center text-gray-500">
            Loading promo codes...
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Code
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Discount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Min Purchase
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Usage
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Expiry
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No promo codes created yet
                  </td>
                </tr>
              ) : (
                promoCodes.map((promo) => (
                  <tr key={promo._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">
                          {promo.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(promo.code)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Copy code"
                        >
                          {copiedCode === promo.code ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {promo.discountType === "percentage"
                        ? `${promo.discountValue}%`
                        : `₦${promo.discountValue}`}
                      {promo.maxDiscount && ` (max ₦${promo.maxDiscount})`}
                    </td>
                    <td className="px-4 py-3">
                      {promo.minPurchase ? `₦${promo.minPurchase}` : "None"}
                    </td>
                    <td className="px-4 py-3">
                      {promo.usedCount || 0}
                      {promo.usageLimit && ` / ${promo.usageLimit}`}
                    </td>
                    <td className="px-4 py-3">
                      {promo.expiryDate
                        ? new Date(promo.expiryDate).toLocaleDateString()
                        : "No expiry"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          promo.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {promo.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(promo)}
                          className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Edit"
                          disabled={isLoading}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(promo._id)}
                          className="p-1 hover:bg-red-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete"
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPromoCodeManager;
