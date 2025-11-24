import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { PressableButton } from "../common/pressable-button";
import { Check } from "lucide-react";

const VariantSelector = ({ product, onVariantChange }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Set default selections on mount
  useEffect(() => {
    if (product && !selectedColor && !selectedSize) {
      let defaultColor = null;
      let defaultSize = null;

      // Set default color
      if (product.colors?.length > 0) {
        defaultColor = product.colors[0];
        setSelectedColor(defaultColor);
      }

      // Set default size
      if (product.sizes?.length > 0) {
        defaultSize = product.sizes.find((s) => s.inStock) || product.sizes[0];
        setSelectedSize(defaultSize);
      }

      // Notify parent of defaults
      if (defaultColor || defaultSize) {
        onVariantChange({
          color: defaultColor,
          size: defaultSize,
        });
      }
    }
  }, [product, selectedColor, selectedSize, onVariantChange]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onVariantChange({
      color: color,
      size: selectedSize,
    });
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    onVariantChange({
      color: selectedColor,
      size: size,
    });
  };

  // Don't render if product has no variants
  if (!product?.hasVariants) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-semibold uppercase text-gray-700">
              Color
            </Label>
            {selectedColor && (
              <span className="text-xs text-muted-foreground uppercase">
                {selectedColor.name}
              </span>
            )}
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {product.colors.map((color) => (
              <PressableButton
                variant="ghost"
                key={color.id}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color.hex }}
                className={`
                  relative w-7 h-7 min-w-[1.75rem] min-h-[1.75rem] rounded-full border-2 transition-all flex-shrink-0 overflow-hidden p-0 hover:bg-transparent aspect-square
                  ${
                    selectedColor?.id === color.id
                      ? "border-black scale-110 shadow-lg"
                      : "border-gray-300 hover:border-gray-400 hover:scale-105"
                  }
                `}
                title={color.name}
              >
                {selectedColor?.id === color.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className="w-4 h-4 text-white drop-shadow-lg"
                      strokeWidth={3}
                    />
                  </div>
                )}
              </PressableButton>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-semibold uppercase text-gray-700">
              Size
            </Label>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
            {product.sizes.map((size) => (
              <PressableButton
                key={size.id}
                onClick={() => handleSizeChange(size)}
                variant="outline"
                className={`
                  h-auto py-2 px-2 text-xs font-medium uppercase transition-all
                  ${
                    selectedSize?.id === size.id
                      ? "border-black bg-black text-white hover:bg-black hover:text-white"
                      : "border-gray-300 hover:border-black hover:bg-gray-50"
                  }
                  ${
                    !size.inStock &&
                    "opacity-50 cursor-not-allowed line-through"
                  }
                `}
                disabled={!size.inStock}
              >
                {size.name}
              </PressableButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
