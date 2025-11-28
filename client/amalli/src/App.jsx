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
import { useEffect, useRef, useState } from "react";
import { checkAuth } from "./store/auth-slice";
import PayStackPaymentVerification from "./pages/shopping-view/payment-verification";
import PaystackSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import AboutUs from "./pages/shopping-view/about";
import FAQPage from "./pages/shopping-view/faqs";
import LoadingPage from "./components/common/loading-page";
import HolidayGreeting from "./components/common/holiday-greeting";
import { getTodayHoliday } from "./lib/utils";
import TermsOfServicePage from "./components/shopping-view/terms-of-service";
import ScrollToTop from "./components/common/scroll-to-top";
import RefundPolicyPage from "./components/shopping-view/refund-policy";
import ContactPage from "./components/shopping-view/contact";
import PrivacyPolicyPage from "./components/shopping-view/privacy-policy";
import AdminNewsletter from "./pages/admin-view/send-newsletter";
import UnsubscribePage from "./pages/shopping-view/newsletter-unsubscribe";
import PromoSystem from "./pages/admin-view/promo-codes";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");
  const hasInitialized = useRef(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(checkAuth())
  //     .unwrap()
  //     .catch((error) => {
  //       // User not authenticated - this is fine, just don't show error
  //       console.log("User not authenticated", error);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    // Only run ONCE, when loading finishes the first time
    if (!isLoading && !hasInitialized.current) {
      hasInitialized.current = true;

      const alreadyShown = localStorage.getItem("holiday_greeting_shown");
      const msg = getTodayHoliday();

      if (!alreadyShown && msg) {
        setGreetingMessage(msg);
        setShowGreeting(true);
        localStorage.setItem("holiday_greeting_shown", "true");
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {showGreeting && (
        <HolidayGreeting
          message={greetingMessage}
          onClose={() => setShowGreeting(false)}
        />
      )}
      <ScrollToTop />
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
          <Route path="newsletter" element={<AdminNewsletter />} />
          <Route path="promos" element={<PromoSystem />} />
        </Route>

        {/* Shop routes - accessible to everyone */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="faqs" element={<FAQPage />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="terms-of-service" element={<TermsOfServicePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="newsletter-unsubscribe" element={<UnsubscribePage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Payment routes - MUST be accessible to guests */}
          <Route
            path="payment-verification"
            element={<PayStackPaymentVerification />}
          />
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
