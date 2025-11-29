import { useState, useEffect } from "react";
import { X, Tag } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const OfferBanner = () => {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetchActiveOffers();
  }, []);

  useEffect(() => {
    if (offers.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [offers]);

  const fetchActiveOffers = async () => {
    try {
      const response = await axios.get(`${API}/api/shop/offer/active`);
      console.log('Full API response:', response.data);
      if (response.data.success) {
        // Only get offers with displayBanner enabled
        const bannerOffers = response.data.data.filter((offer) => offer.displayBanner);
        setOffers(bannerOffers);
      }
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  if (!visible || offers.length === 0) return null;

  const currentOffer = offers[currentIndex];

  return (
    <div
      className="relative w-full py-1 px-8 lg:py-3 lg:px-4 text-white text-center mt-16"
      style={{ backgroundColor: currentOffer.bannerColor }}
    >
      <div className="flex items-center justify-center gap-2">
        {/* <Tag className="w-4 h-4" /> */}
        <p className="text-sm md:text-base font-medium">
          {currentOffer.title} -
          {currentOffer.discountType === "percentage"
            ? ` ${currentOffer.discountValue}% OFF`
            : ` ₦${currentOffer.discountValue} OFF`}
          {currentOffer.description && ` | ${currentOffer.description}`}
        </p>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded"
      >
        <X className="w-4 h-4" />
      </button>

      {offers.length > 1 && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {offers.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferBanner;