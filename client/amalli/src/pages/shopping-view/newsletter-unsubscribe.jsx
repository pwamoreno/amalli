import React, { useState } from "react";
import { Mail, CheckCircle, XCircle, Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { newsletterUnsubscribe } from "@/store/shop/newsletter-slice";
import { PressableButton } from "@/components/common/pressable-button";

export default function UnsubscribePage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUnsubscribe = async () => {
    if (!email.trim()) {
      setResult({
        success: false,
        message: "Please enter your email address",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setResult({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await dispatch(newsletterUnsubscribe({ email })).unwrap();

      if (data.success) {
        setResult({
          success: true,
          message: data.message,
        });
        setEmail(""); // Clear input on success
      } else {
        setResult({
          success: false,
          message: data.message || "Failed to unsubscribe",
        });
      }
    } catch (error) {
      console.log(error);
      setResult({
        success: false,
        message: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUnsubscribe();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-6 mt-12">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Unsubscribe from Newsletter
            </h1>
            <p className="text-gray-600">
              We're sorry to see you go. Enter your email to unsubscribe from
              our mailing list.
            </p>
          </div>

          {/* Result Alert */}
          {result && (
            <div
              className={`rounded-lg p-4 mb-6 flex items-start gap-3 ${
                result.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {result.success ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    result.success ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {result.success ? "Success!" : "Error"}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    result.success ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {result.message}
                </p>
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                disabled={loading}
              />
            </div>

            <PressableButton
              onClick={handleUnsubscribe}
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Unsubscribe"
              )}
            </PressableButton>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-3">Changed your mind?</p>
            <a
              href="/"
              className="text-sm font-medium text-purple-600 hover:text-purple-700 transition"
            >
              Return to Homepage
            </a>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-3">
            What happens next?
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <span>
                You'll stop receiving our newsletter emails immediately
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <span>
                You may still receive transactional emails (order confirmations,
                etc.)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <span>You can resubscribe anytime on our website</span>
            </li>
          </ul>
        </div>

        {/* Help Text */}
        {/* <p className="text-center text-sm text-gray-500 mt-6">
          Having trouble? Contact us at{" "}
          <a
            href="mailto:support@amallijewelry.com"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            support@amallijewelry.com
          </a>
        </p> */}
      </div>
    </div>
  );
}
