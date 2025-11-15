import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingListing from "./pages/shopping-view/listing";
import CheckAuth from "./components/common/check-auth";
import Unauth from "./pages/unauth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PayStackPaymentVerification from "./pages/shopping-view/payment-verification";
import PaystackSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="h-[600px] w-[600px]" />;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        {/* Shop routes - accessible to everyone */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="search" element={<SearchProducts />} />
          
          {/* Payment routes - MUST be accessible to guests */}
          <Route path="payment-verification" element={<PayStackPaymentVerification />} />
          <Route path="payment-success" element={<PaystackSuccessPage />} />
          
          {/* Only account needs authentication */}
          <Route
            path="account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingAccount />
              </CheckAuth>
            }
          />
        </Route>

        {/* Redirect root to shop home */}
        <Route path="/" element={<ShoppingLayout />}>
          <Route index element={<ShoppingHome />} />
        </Route>

        <Route path="unauth-page" element={<Unauth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;










// import { Route, Routes } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminFeatures from "./pages/admin-view/features";
// import AdminOrders from "./pages/admin-view/orders";
// import AdminProducts from "./pages/admin-view/products";
// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/not-found";
// import ShoppingHome from "./pages/shopping-view/home";
// import ShoppingAccount from "./pages/shopping-view/account";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingListing from "./pages/shopping-view/listing";
// import CheckAuth from "./components/common/check-auth";
// import Unauth from "./pages/unauth";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "@/components/ui/skeleton";
// import PayStackPaymentVerification from "./pages/shopping-view/payment-verification";
// import PaystackSuccessPage from "./pages/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/search";

// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) {
//     return <Skeleton className="h-[600px] w-[600px]" />;
//   }

//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//       <Routes>
//         <Route
//           path="/auth"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AuthLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="login" element={<AuthLogin />} />
//           <Route path="register" element={<AuthRegister />} />
//         </Route>
//         <Route
//           path="/admin"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AdminLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="features" element={<AdminFeatures />} />
//           <Route path="orders" element={<AdminOrders />} />
//           <Route path="products" element={<AdminProducts />} />
//         </Route>

//         //code for making root directory shop view
//         <Route path="/" element={<ShoppingLayout />}>
//           <Route index element={<ShoppingHome />} />
//           <Route path="listing" element={<ShoppingListing />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//         </Route>

//         //replacement code for unauthing the shop
//         <Route path="/shop" element={<ShoppingLayout />}>
//           <Route path="home" element={<ShoppingHome />} />
//           <Route
//             path="account"
//             element={
//               <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//                 <ShoppingAccount />
//               </CheckAuth>
//             }
//           />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="listing" element={<ShoppingListing />} />
//         </Route>
//         <Route path="unauth-page" element={<Unauth />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

// //code with auth for shop
// {
//   /* <Route
//           path="/shop"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <ShoppingLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="home" element={<ShoppingHome />} />
//           <Route path="account" element={<ShoppingAccount />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="listing" element={<ShoppingListing />} />
//           <Route path="payment-verification" element={<PayStackPaymentVerification />} />
//           <Route path="payment-success" element={<PaystackSuccessPage />} />
//           <Route path="search" element={<SearchProducts />} />
//         </Route> */
// }
