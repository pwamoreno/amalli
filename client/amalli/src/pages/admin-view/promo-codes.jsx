import AdminPromoCodeManager from "@/components/admin-view/promo-manager";
import AdminSpecialOffersManager from "@/components/admin-view/special-offer";
import { PressableButton } from "@/components/common/pressable-button";
import { useState } from "react";


export default function PromoSystem() {
  const [activeTab, setActiveTab] = useState("promo");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold mb-4">Promos and Special Offers</h1>
          <div className="flex gap-2">
            <PressableButton
              onClick={() => setActiveTab("promo")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "promo"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Promo Codes
            </PressableButton>
            <PressableButton
              onClick={() => setActiveTab("offers")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "offers"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Special Offers
            </PressableButton>
          </div>
        </div>
      </div>

      <div className="py-6">
        {activeTab === "promo" ? (
          <AdminPromoCodeManager />
        ) : (
          <AdminSpecialOffersManager />
        )}
      </div>
    </div>
  );
}