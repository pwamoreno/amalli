import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const backgroundImageUrl =
    "/auth.avif";

  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        {/* Dark Overlay: Makes sure text is readable on any image */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content with z-10 to sit on top of the overlay */}
        <div className="relative z-10 max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome</h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
