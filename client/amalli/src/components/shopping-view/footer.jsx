import React, { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Pinterest2,
  TikTok,
  WhatsApp,
  X,
} from "../icons/AmalliLogo";
import { getCurrentDateInfo } from "@/lib/utils";
import EmailSignupSystem from "@/pages/shopping-view/email-signup";

const ShoppingFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [_searchParams, setSearchParams] = useSearchParams();
  const [isWhatsAppMinimized, setIsWhatsAppMinimized] = useState(false);
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);

  // Minimize WhatsApp button after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsWhatsAppMinimized(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const { year: currentYear } = getCurrentDateInfo();

  const footerNav = [
    { label: "Search", id: "search", path: "/shop/search" },
    { label: "All Products", id: "products", path: "/shop/listing" },
    {
      label: "Necklaces",
      id: "necklaces",
      path: "/shop/listing?category=necklaces",
    },
    {
      label: "Earrings",
      id: "earrings",
      path: "/shop/listing?category=earrings",
    },
    {
      label: "Unsubscribe from Newsletter",
      id: "unsubscribe",
      path: "/shop/newsletter-unsubscribe",
    },
  ];

  const handleFooterNavigate = (navItem) => {
    // Clear filters from sessionStorage
    sessionStorage.removeItem("filters");

    // Pages that should NOT have filters
    const noFilterPages = ["search", "unsubscribe"];

    if (noFilterPages.includes(navItem.id)) {
      setSearchParams({});
      navigate(navItem.path);
      return;
    }

    // Set up filter for category pages
    const currentFilter =
      navItem.id !== "products" && navItem.id !== "search"
        ? { category: [navItem.id] }
        : null;

    if (currentFilter) {
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    }

    // Navigate with appropriate search params
    if (navItem.id === "products") {
      // All Products - no filter
      setSearchParams({});
      navigate(navItem.path);
    } else if (currentFilter) {
      // Category-specific pages (necklaces, earrings)
      if (location.pathname.includes("listing")) {
        setSearchParams(new URLSearchParams(`?category=${navItem.id}`));
      }
      navigate(navItem.path);
    } else {
      // Other pages
      navigate(navItem.path);
    }
  };

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
                {footerNav.map((navItem) => (
                  <button
                    key={navItem.id}
                    onClick={() => handleFooterNavigate(navItem)}
                    className="text-gray-700 hover:underline transition-colors text-left"
                  >
                    {navItem.label}
                  </button>
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
                  href="mailto:support@amallijewelry.com"
                  className="font-medium text-sm text-blue-600 hover:underline transition-colors"
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
