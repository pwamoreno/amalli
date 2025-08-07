import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, DoorOpen } from "lucide-react";

const AdminHeader = ({ setOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow hover:bg-red-400 hover:cursor-pointer">
          <DoorOpen />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
