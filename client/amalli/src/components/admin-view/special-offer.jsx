import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Percent, Calendar, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import {
  getAllOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from "@/store/admin/offer-slice";

const AdminSpecialOffersManager = () => {
  const dispatch = useDispatch();
  const { offers, isLoading } = useSelector((state) => state.adminOffers);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    offerType: "category",
    discountType: "percentage",
    discountValue: "",
    targetId: "",
    startDate: "",
    endDate: "",
    isActive: true,
    displayBanner: true,
    bannerColor: "#ef4444",
  });

  // Fetch offers on component mount
  useEffect(() => {
    dispatch(getAllOffers());
  }, [dispatch]);

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.discountValue ||
      !formData.startDate ||
      !formData.endDate
    ) {
      toast("Please fill in required fields", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    // Validate targetId for category/product offers
    if (formData.offerType !== "sitewide" && !formData.targetId.trim()) {
      toast("Please enter a target ID for this offer type", {
        style: { background: "#fa113d", color: "white" },
      });
      return;
    }

    // Clean up data
    const cleanedData = {
      title: formData.title,
      description: formData.description,
      offerType: formData.offerType,
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      targetId: formData.offerType === "sitewide" ? null : formData.targetId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isActive: formData.isActive,
      displayBanner: formData.displayBanner,
      bannerColor: formData.bannerColor,
    };

    if (editingId) {
      // Update existing offer
      dispatch(updateOffer({ id: editingId, offerData: cleanedData }))
        .unwrap()
        .then(() => {
          toast("Special offer updated successfully", {
            style: { background: "#10b981", color: "white" },
          });
          resetForm();
        })
        .catch((error) => {
          toast(error.message || "Failed to update offer", {
            style: { background: "#fa113d", color: "white" },
          });
        });
    } else {
      // Create new offer
      dispatch(createOffer(cleanedData))
        .unwrap()
        .then(() => {
          toast("Special offer created successfully", {
            style: { background: "#10b981", color: "white" },
          });
          resetForm();
        })
        .catch((error) => {
          toast(error.message || "Failed to create offer", {
            style: { background: "#fa113d", color: "white" },
          });
        });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      offerType: "category",
      discountType: "percentage",
      discountValue: "",
      targetId: "",
      startDate: "",
      endDate: "",
      isActive: true,
      displayBanner: true,
      bannerColor: "#ef4444",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (offer) => {
    setFormData({
      title: offer.title,
      description: offer.description || "",
      offerType: offer.offerType,
      discountType: offer.discountType,
      discountValue: offer.discountValue,
      targetId: offer.targetId || "",
      startDate: offer.startDate ? offer.startDate.split("T")[0] : "",
      endDate: offer.endDate ? offer.endDate.split("T")[0] : "",
      isActive: offer.isActive,
      displayBanner: offer.displayBanner,
      bannerColor: offer.bannerColor || "#ef4444",
    });
    setEditingId(offer._id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      dispatch(deleteOffer(id))
        .unwrap()
        .then(() => {
          toast("Special offer deleted successfully", {
            style: { background: "#10b981", color: "white" },
          });
        })
        .catch((error) => {
          toast(error.message || "Failed to delete offer", {
            style: { background: "#fa113d", color: "white" },
          });
        });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Percent className="w-6 h-6" />
          Special Offers Manager
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Create Special Offer
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Offer Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Black Friday Sale"
                disabled={isLoading}
              />
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
                placeholder="Get amazing discounts on all necklaces"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Offer Type *
              </label>
              <select
                value={formData.offerType}
                onChange={(e) =>
                  setFormData({ ...formData, offerType: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                disabled={isLoading}
              >
                <option value="sitewide">Sitewide</option>
                <option value="category">Specific Category</option>
                <option value="product">Specific Product</option>
              </select>
            </div>

            {formData.offerType !== "sitewide" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  {formData.offerType === "category"
                    ? "Category ID"
                    : "Product ID"}{" "}
                  *
                </label>
                <input
                  type="text"
                  value={formData.targetId}
                  onChange={(e) =>
                    setFormData({ ...formData, targetId: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter ID"
                  disabled={isLoading}
                />
              </div>
            )}

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
                  formData.discountType === "percentage" ? "20" : "5000"
                }
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                End Date *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Banner Color
              </label>
              <input
                type="color"
                value={formData.bannerColor}
                onChange={(e) =>
                  setFormData({ ...formData, bannerColor: e.target.value })
                }
                className="w-full h-10 border rounded px-1 py-1"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.displayBanner}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayBanner: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <label className="text-sm font-medium">Display Banner</label>
              </div>
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
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : editingId
                ? "Update Offer"
                : "Create Offer"}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {isLoading && !showForm ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
            Loading special offers...
          </div>
        ) : offers.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
            No special offers created yet
          </div>
        ) : (
          offers.map((offer) => (
            <div key={offer._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-2">{offer.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {offer.offerType}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                      {offer.discountType === "percentage"
                        ? `${offer.discountValue}% OFF`
                        : `₦${offer.discountValue} OFF`}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(offer.startDate).toLocaleDateString()} to{" "}
                      {new Date(offer.endDate).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded ${
                        offer.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {offer.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Edit"
                    disabled={isLoading}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="p-2 hover:bg-red-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete"
                    disabled={isLoading}
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
              {offer.displayBanner && (
                <div
                  className="p-3 rounded text-white font-medium"
                  style={{ backgroundColor: offer.bannerColor }}
                >
                  Banner Preview: {offer.title}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminSpecialOffersManager;