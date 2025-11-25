import { PressableButton } from "@/components/common/pressable-button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";

const NewArrivalsSection = ({
  products = [],
  handleGetProductDetails,
  handleAddToCart,
}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Sort products by date (newest first) and take first 8
  const newArrivals = [...products]
    .filter((product) => new Date(product.createdAt) >= oneWeekAgo)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  // Reset currentIndex when itemsPerView changes to prevent out-of-bounds
  useEffect(() => {
    const newMaxIndex = Math.max(0, newArrivals.length - itemsPerView);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [itemsPerView, newArrivals.length, currentIndex]);

  const maxIndex = Math.max(0, newArrivals.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleViewAll = () => {
    // Set up filter for new products
    const newProductsFilter = {
      category: ["new-arrivals"],
    };
    sessionStorage.setItem("filters", JSON.stringify(newProductsFilter));
    // Navigate to listing page with category param
    navigate("/shop/listing?category=new-arrivals");
  };

  if (!newArrivals.length) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-2 lg:px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-xl lg:text-3xl font-bold text-gray-900 pl-1.5 mb-2">
              New Arrivals
            </h2>
          </div>

          {/* Navigation Arrows - Desktop */}
          {newArrivals.length > itemsPerView && (
            <div className="hidden md:flex gap-2">
              <PressableButton
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                variant="outline"
                size="icon"
                className={`rounded-full ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900 hover:text-white hover:cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </PressableButton>
              <PressableButton
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                variant="outline"
                size="icon"
                className={`rounded-full ${
                  currentIndex >= maxIndex
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900 hover:text-white hover:cursor-pointer"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </PressableButton>
            </div>
          )}
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden max-w-6xl mx-auto">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {newArrivals.map((product) => (
              <div
                key={product._id}
                className="flex-shrink-0 px-1.5 sm:px-2 md:px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="relative">
                  <ShoppingProductTile
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                  {/* NEW Badge Overlay */}
                  <div className="absolute top-2 right-1 bg-green-500 text-white text-xs px-1 py-1 rounded-full shadow-lg z-10">
                    New
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        {newArrivals.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-gray-900" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <PressableButton
            onClick={handleViewAll}
            className="group flex items-center gap-2 bg-[#02066f] text-white hover:bg-green-500 hover:cursor-pointer"
          >
            <span className="font-semibold">View All New Arrivals</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </PressableButton>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
