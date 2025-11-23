import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  // lagosShippingZones,
  nigeriaStatesShipping,
} from "@/config/";
import { addCommasToNumbers } from "@/lib/utils";

const ShippingSelector = ({ onShippingChange }) => {
  const [shippingType, setShippingType] = useState("interstate"); // "lagos" or "interstate"
  // const [_selectedZone, setSelectedZone] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  // const [_selectedArea, setSelectedArea] = useState("");

  // Handle Lagos zone selection
  // const handleZoneChange = (zoneId) => {
  //   const zone = lagosShippingZones.find((z) => z.id === zoneId);
  //   setSelectedZone(zone);
  //   setSelectedArea(""); // Reset area

  //   if (zone) {
  //     onShippingChange({
  //       type: "lagos",
  //       zone: zone.name,
  //       area: "",
  //       price: zone.price,
  //     });
  //   }
  // };

  // Handle area selection within Lagos zone
  // const handleAreaChange = (area) => {
  //   setSelectedArea(area);

  //   if (selectedZone) {
  //     onShippingChange({
  //       type: "lagos",
  //       zone: selectedZone.name,
  //       area: area,
  //       price: selectedZone.price,
  //     });
  //   }
  // };

  // Handle interstate selection
  const handleStateChange = (state) => {
    const stateData = nigeriaStatesShipping.find((s) => s.state === state);
    setSelectedState(stateData);

    if (stateData) {
      onShippingChange({
        type: "interstate",
        state: stateData.state,
        price: stateData.price,
      });
    }
  };

  // Handle shipping type toggle
  const handleTypeChange = (type) => {
    setShippingType(type);
    // setSelectedZone(null);
    setSelectedState("");
    // setSelectedArea("");
    onShippingChange(null); // Reset shipping
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-3 block">
          Shipping Location
        </Label>

        {/* Shipping Type Selection */}
        <RadioGroup value={shippingType} onValueChange={handleTypeChange}>
          {/* <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="lagos" id="lagos" />
            <Label htmlFor="lagos" className="cursor-pointer font-normal">
              Lagos (Zone-based shipping)
            </Label>
          </div> */}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="interstate" id="interstate" />
            <Label htmlFor="interstate" className="cursor-pointer font-normal">
              States (Interstate shipping)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Interstate Selection */}
      {shippingType === "interstate" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="state" className="mb-3">Select State</Label>
            <Select
              onValueChange={handleStateChange}
              value={selectedState?.state || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your state" />
              </SelectTrigger>
              <SelectContent>
                {nigeriaStatesShipping
                  .filter((s) => s.state !== "") 
                  .map((state) => (
                    <SelectItem key={state.state} value={state.state}>
                      {state.state} - ₦{addCommasToNumbers(state.price)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Shipping Info */}
          {selectedState && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                Shipping to: {selectedState.state} State
              </p>
              <p className="text-lg font-bold text-blue-900 mt-1">
                ₦{addCommasToNumbers(selectedState.price)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingSelector;

// {
//   /* Lagos Zone Selection */
// }
// {
//   shippingType === "lagos" && (
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor="zone">Select Zone</Label>
//         <Select onValueChange={handleZoneChange} value={selectedZone?.id}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Choose your zone" />
//           </SelectTrigger>
//           <SelectContent>
//             {lagosShippingZones.map((zone) => (
//               <SelectItem key={zone.id} value={zone.id}>
//                 {zone.name} - ₦{addCommasToNumbers(zone.price)}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Area Selection within Zone */}
//       {selectedZone && (
//         <div>
//           <Label htmlFor="area">Select Specific Area</Label>
//           <Select onValueChange={handleAreaChange} value={selectedArea}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Choose your area" />
//             </SelectTrigger>
//             <SelectContent>
//               {selectedZone.areas.map((area) => (
//                 <SelectItem key={area} value={area}>
//                   {area}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       )}

//       {/* Selected Shipping Info */}
//       {selectedZone && selectedArea && (
//         <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
//           <p className="text-sm font-medium text-green-900">
//             Shipping to: {selectedArea}, {selectedZone.name}
//           </p>
//           <p className="text-lg font-bold text-green-900 mt-1">
//             ₦{addCommasToNumbers(selectedZone.price)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
