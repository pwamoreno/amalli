import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AlignJustify,
  ShoppingCart,
  User,
  DoorOpen,
  Search,
  LogIn,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { PressableButton } from "../common/pressable-button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { AmalliLogo } from "../icons/AmalliLogo";

function MenuItems({ onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [_searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentItem) {
    // Clear filters from sessionStorage
    sessionStorage.removeItem("filters");

    // Pages that should NOT have search params
    const noParamPages = ["about", "faq", "home"];

    if (noParamPages.includes(getCurrentItem.id)) {
      setSearchParams({});
      navigate(getCurrentItem.path);
      // Call onNavigate to close sheet
      if (onNavigate) onNavigate();
      return;
    }

    // Regular filter logic for product pages
    const currentFilter =
      getCurrentItem.id !== "home" && getCurrentItem.id !== "products"
        ? { category: [getCurrentItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`));
    }

    navigate(getCurrentItem.path);
    if (onNavigate) onNavigate();
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ml-4">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        let isActive = false;

        const currentPath = location.pathname;
        const currentSearch = location.search;

        // SPLIT item path into path + query parts
        const [itemPath, itemQuery] = menuItem.path.split("?");

        if (!itemQuery) {
          // No query in menu item
          if (menuItem.id === "products") {
            // PRODUCTS = listing WITHOUT query
            isActive = currentPath === itemPath && currentSearch === "";
          } else {
            // Normal pages (home, about, faq)
            isActive = currentPath === itemPath;
          }
        } else {
          // Query exists → men, women, kids
          isActive =
            currentPath === itemPath && currentSearch === `?${itemQuery}`;
        }
        return (
          <Label
            key={menuItem.id}
            className={`
              text-sm font-medium cursor-pointer transition-all
              ${
                isActive
                  ? "underline underline-offset-4 decoration-2"
                  : "hover:underline hover:underline-offset-4 hover:decoration-2"
              }
            `}
            onClick={() => handleNavigate(menuItem)}
          >
            {menuItem.label}
          </Label>
        );
      })}
    </nav>
  );
}

function HeaderRightContent({ className, onNavigate }) {
  const { user, isAuthenticated, guestId } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = isAuthenticated ? user?.id : guestId;

  function handleLogout() {
    dispatch(logoutUser());
    if (onNavigate) onNavigate();
  }

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId)); // Fetch cart for guest or user
    }
  }, [dispatch, userId]);

  return (
    <div
      className={`flex lg:items-center lg:flex-row flex-col gap-4 ${className}`}
    >
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <PressableButton
          onClick={() => {
            navigate("/shop/search");
            if (onNavigate) onNavigate();
          }}
          variant="outline"
          size="icon"
          className="hover:cursor-pointer"
        >
          <Search className="h-6 w-6" />
        </PressableButton>
        <PressableButton
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative hover:cursor-pointer"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {cartItems.items.length}
            </span>
          )}
          <span className="sr-only">User cart</span>
        </PressableButton>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black hover:cursor-pointer">
              <AvatarFallback className="bg-white text-gray-600 font-bold">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-full mt-4">
            <DropdownMenuLabel>
              Logged in as <strong>{user?.userName}</strong>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/shop/account");
                if (onNavigate) onNavigate();
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <DoorOpen className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // Guest user - show login button
        <PressableButton
          onClick={() => {
            navigate("/auth/login");
            if (onNavigate) onNavigate();
          }}
          variant="outline"
          className="hover:cursor-pointer"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </PressableButton>
      )}
    </div>
  );
}

const ShoppingHeader = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <AmalliLogo size={80} />
          {/* <span className="font-bold">amalli</span> */}
        </Link>
        <div className="flex items-center gap-2 lg:hidden">
          <PressableButton
            onClick={() => navigate("/shop/search")}
            variant="outline"
            size="icon"
            className="hover:cursor-pointer"
          >
            <Search className="h-6 w-6" />
          </PressableButton>

          <Sheet>
            <SheetTrigger asChild>
              <PressableButton
                variant="outline"
                size="icon"
                className="relative hover:cursor-pointer"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItems?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartItems.items.length}
                  </span>
                )}
              </PressableButton>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <UserCartWrapper
                cartItems={
                  cartItems && cartItems.items && cartItems.items.length > 0
                    ? cartItems.items
                    : []
                }
              />
            </SheetContent>
          </Sheet>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <PressableButton variant="outline" size="icon">
                <AlignJustify className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </PressableButton>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <HeaderRightContent
                className="flex-row items-center justify-between mx-4 mt-12"
                inSheet={true}
                onNavigate={handleSheetClose}
              />
              <MenuItems onNavigate={handleSheetClose} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
