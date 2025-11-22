import React, { useState } from "react";
// import { Send, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Facebook,
  Instagram,
  Pinterest2,
  TikTok,
  WhatsApp,
  X,
} from "../icons/AmalliLogo";
import { useNavigate } from "react-router-dom";
import { getCurrentDateInfo } from "@/lib/utils";
import EmailSignupSystem from "@/pages/shopping-view/email-signup";

const ShoppingFooter = () => {
  const navigate = useNavigate();
  const [isWhatsAppMinimized, setIsWhatsAppMinimized] = useState(false);
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  //   const [country, setCountry] = useState("nigeria");


  // Minimize WhatsApp button after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsWhatsAppMinimized(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const { year: currentYear } = getCurrentDateInfo();

  const footerNav = ["Search", "All Products", "Necklaces", "Earrings"];

  const socials = [
    {
      id: 1,
      link: "x",
      path: "amallijewelry?s=21",
      logo: X,
      aria: "X",
    },
    {
      id: 2,
      link: "instagram",
      path: "amallijewelry?igsh=Ym92MTRnMHQyeWV2&utm_source=qr",
      logo: Instagram,
      aria: "Instagram",
    },
    {
      id: 3,
      link: "tiktok",
      path: "@amallijewelry",
      logo: TikTok,
      aria: "TikTok",
    },
    {
      id: 4,
      link: "pinterest",
      path: "AmalliJewelry/",
      logo: Pinterest2,
      aria: "Pinterest",
    },
  ];
  const legals = [
    {
      id: 1,
      link: "refund-policy",
      name: "Refund policy",
    },
    {
      id: 2,
      link: "privacy-policy",
      name: "Privacy policy",
    },
    {
      id: 3,
      link: "terms-of-service",
      name: "Terms of service",
    },
    {
      id: 4,
      link: "contact",
      name: "Contact information",
    },
  ];

  return (
    <footer className="bg-[#faf9f7] mt-30">
      <EmailSignupSystem />
      {/* Newsletter Section */}
    

      {/* Links and Contact Section */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-serif font-semibold mb-6">
                Quick links
              </h3>
              <nav className="flex flex-col space-y-3">
                {footerNav.map((navItem, index) => (
                  <a
                    key={index}
                    href={
                      navItem === "Search"
                        ? `/shop/${navItem.toLowerCase()}`
                        : `/shop/listing?category=${navItem.toLowerCase()}`
                    }
                    className="text-gray-700 hover:underline transition-colors"
                  >
                    {navItem}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-serif font-semibold mb-6">
                Reach out to us
              </h3>

              <div className="mb-6">
                <span className="text-gray-700">Send us an email here: </span>
                <a
                  href="mailto:support@amalli.com"
                  className="text-gray-900 font-medium text-sm hover:text-gray-700 transition-colors"
                >
                  support@amallijewelry.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-8 mt-12 mb-8">
            {socials.map((linkObj) => (
              <a
                key={linkObj.id}
                href={`https://${linkObj.link}.com/${linkObj.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label={`${linkObj.aria}`}
              >
                <linkObj.logo className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Country Selector */}
          {/* <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Country/region</p>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nigeria">Nigeria | NGN ₦</SelectItem>
                <SelectItem value="usa">United States | USD $</SelectItem>
                <SelectItem value="uk">United Kingdom | GBP £</SelectItem>
                <SelectItem value="ghana">Ghana | GHS ₵</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Copyright and Links */}
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-600 pb-16">
            {legals.map((legal) => (
              <span
                key={legal.id}
                onClick={() => navigate(`/shop/${legal.link}`)}
                className="hover:underline cursor-pointer"
              >
                {legal.name}
              </span>
            ))}
          </div>
          <div className="flex justify-center text-xs text-gray-600">
            <span>&copy; {currentYear}, AMALLI Jewelry</span>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Button - Fixed Position */}
      <a
        href="https://wa.me/+2348104832511"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsWhatsAppHovered(true)}
        onMouseLeave={() => setIsWhatsAppHovered(false)}
        className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-[#25D366] text-white rounded-md hover:bg-[#20BA5A] transition-all duration-500 shadow-lg hover:shadow-xl ${
          isWhatsAppMinimized && !isWhatsAppHovered
            ? "w-14 h-14 p-0 justify-center"
            : "px-5 py-3"
        }`}
        style={{
          width: isWhatsAppMinimized && !isWhatsAppHovered ? "56px" : "auto",
          height: "56px",
          padding: isWhatsAppMinimized && !isWhatsAppHovered ? "0" : "0 20px",
          justifyContent:
            isWhatsAppMinimized && !isWhatsAppHovered ? "center" : "flex-start",
          gap: isWhatsAppMinimized && !isWhatsAppHovered ? "0" : "8px",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <WhatsApp
          className="flex-shrink-0"
          style={{
            width: "20px",
            height: "20px",
            minWidth: "20px",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <span
          className="whitespace-nowrap"
          style={{
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            width: isWhatsAppMinimized && !isWhatsAppHovered ? "0px" : "auto",
            opacity: isWhatsAppMinimized && !isWhatsAppHovered ? 0 : 1,
            overflow: "hidden",
          }}
        >
          Chat on WhatsApp
        </span>
      </a>
    </footer>
  );
};

export default ShoppingFooter;
