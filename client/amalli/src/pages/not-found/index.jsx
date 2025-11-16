import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, ShoppingBag, ArrowLeft } from "lucide-react";
import NotFoundIcon from "../../assets/not-found.svg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Broken Link Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Custom 404 Illustration */}
            <div className="mb-8 flex justify-center">
              <img src={NotFoundIcon} alt="Not Found" className="w-96" />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          {/* <h1 className="text-8xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-3">
            Page Not Found
          </h2> */}
          <p className="text-lg text-gray-500 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-400">
            The link might be broken or the page may have been removed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full sm:w-auto"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/shop/home")}
            className="w-full sm:w-auto bg-black hover:bg-gray-800"
            size="lg"
          >
            <Home className="mr-2 h-5 w-5" />
            Home Page
          </Button>

          <Button
            onClick={() => navigate("/shop/search")}
            variant="outline"
            className="w-full sm:w-auto"
            size="lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Products
          </Button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Looking for something?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/shop/listing")}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              All Products
            </button>
            <button
              onClick={() => navigate("/shop/checkout")}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Checkout
            </button>
            <button
              onClick={() => navigate("/shop/account")}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

// import React from 'react'

// const NotFound = () => {
//   return (
//     <div>NotFound!</div>
//   )
// }

// export default NotFound
