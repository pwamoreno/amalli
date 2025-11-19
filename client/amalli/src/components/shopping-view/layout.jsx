import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

const ShoppingLayout = () => {
  const location = useLocation();
  const isSearchPage = location.pathname.includes("search");
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* header */}
      {!isSearchPage && <ShoppingHeader />}
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      {/* footer */}
      <ShoppingFooter />
    </div>
  );
};

export default ShoppingLayout;
