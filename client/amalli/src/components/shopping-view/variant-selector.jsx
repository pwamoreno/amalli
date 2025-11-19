import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
              <button
                key={color.id}
                onClick={() => handleColorChange(color)}
                className={`
                  relative w-7 h-7 rounded-full border-2 transition-all
                  ${
                    selectedColor?.id === color.id
                      ? "border-black scale-110 shadow-lg"
                      : "border-gray-300 hover:border-gray-400 hover:scale-105"
                  }
                `}
                title={color.name}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                {selectedColor?.id === color.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check
                      className="w-4 h-4 text-white drop-shadow-lg"
                      strokeWidth={3}
                    />
                  </div>
                )}
              </button>
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
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-xs text-blue-600 hover:underline uppercase tracking-wide">
                  Size Chart
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Size Chart</DialogTitle>
                  <DialogDescription>
                    Find your perfect fit with our size guide
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Size</th>
                          <th className="text-left p-3 font-semibold">
                            Chest (inches)
                          </th>
                          <th className="text-left p-3 font-semibold">
                            Waist (inches)
                          </th>
                          <th className="text-left p-3 font-semibold">
                            Hips (inches)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">XS</td>
                          <td className="p-3">32-34</td>
                          <td className="p-3">24-26</td>
                          <td className="p-3">34-36</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">S</td>
                          <td className="p-3">34-36</td>
                          <td className="p-3">26-28</td>
                          <td className="p-3">36-38</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">M</td>
                          <td className="p-3">36-38</td>
                          <td className="p-3">28-30</td>
                          <td className="p-3">38-40</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">L</td>
                          <td className="p-3">38-40</td>
                          <td className="p-3">30-32</td>
                          <td className="p-3">40-42</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">XL</td>
                          <td className="p-3">40-42</td>
                          <td className="p-3">32-34</td>
                          <td className="p-3">42-44</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-3 font-medium">XXL</td>
                          <td className="p-3">42-44</td>
                          <td className="p-3">34-36</td>
                          <td className="p-3">44-46</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>How to measure:</strong> Measure around the
                      fullest part of your chest, natural waistline, and hips.
                      Keep the tape measure parallel to the floor.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
            {product.sizes.map((size) => (
              <Button
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
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
