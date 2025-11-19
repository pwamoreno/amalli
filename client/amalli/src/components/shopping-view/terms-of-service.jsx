// import { getCurrentDateInfo } from "@/lib/utils";
import React from "react";

const TermsOfServicePage = () => {
//   const { year: currentYear } = getCurrentDateInfo();
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-serif text-center mb-12">
          Terms of service
        </h1>

        {/* Content Container */}
        <div className="space-y-12 text-gray-700">
          {/* Section 1: Terms of Service */}
          <section>
            <div className="space-y-6 leading-relaxed">
              <p>
                Welcome to Amalli ("we", "our", or "the Company"). By accessing
                our website, purchasing our products, or engaging with our
                services, you agree to these Terms & Conditions. Please read
                them carefully.
              </p>

              <div>
                <h3 className="font-semibold mb-3">1. Use of Our Website</h3>
                <p className="mb-2">You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the site only for lawful purposes.</li>
                  <li>
                    Not engage in harmful actions (e.g., hacking, scraping,
                    malware, data harvesting).
                  </li>
                  <li>
                    Not copy or distribute any content without permission.
                  </li>
                </ul>
                <p className="mt-3">
                  We reserve the right to restrict access to anyone who violates
                  these terms.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">2. Product Information</h3>
                <p className="mb-2">
                  We strive for accuracy in product descriptions. However:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Colors may vary due to screen settings.</li>
                  <li>
                    Slight variations may occur with handmade or custom jewelry.
                  </li>
                  <li>
                    We reserve the right to update product information at any
                    time.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">3. Pricing & Payment</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices are displayed in Nigerian Naira (NGN).</li>
                  <li>We reserve the right to adjust pricing at any time.</li>
                  <li>
                    Payment is accepted via secure third-party processors
                    (Paystack).
                  </li>
                  <li>Orders are processed only after payment confirmation.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  4. Order Processing & Shipping
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Orders ship within Nigeria only.</li>
                  <li>
                    Delivery time is 3-8 working days for interstate delivery
                    and 12-24hrs after purchase within Lagos.
                  </li>
                  <li>
                    We are not liable for courier delays due to inaccurate
                    information from the buyer.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  5. Custom/Personalized Orders
                </h3>
                <p className="mb-2">Custom items:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Are non-refundable</li>
                  <li>Are processed within 5 weeks</li>
                  <li>
                    Cannot be altered once production begins. Kindly ensure that
                    the information presented is accurate.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">6. Intellectual Property</h3>
                <p>
                  All content—logos, product images, videos, text—is the
                  exclusive property of Amalli. Unauthorized use is prohibited.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  7. Right to Refuse Service
                </h3>
                <p>
                  We reserve the right to refuse service to anyone at any time
                  for reasons, including abusive behavior, non-compliance with
                  terms, or fraudulent activities.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Return & Refund Policy */}
          <section>
            <h2 className="text-xl font-bold uppercase mb-6 tracking-wide">
              2. RETURN & REFUND POLICY
            </h2>
            <div className="space-y-6 leading-relaxed">
              <p>
                At Amalli, we prioritize customer satisfaction. This policy
                outlines the conditions under which returns, exchanges, and
                refunds are accepted.
              </p>

              <div>
                <h3 className="font-semibold mb-3">
                  1. Eligibility for Returns
                </h3>
                <p className="mb-2">We accept returns only if:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    a wrong or faulty item is delivered. Kindly read all product
                    descriptions properly before placing an order.
                  </li>
                  <li>It is returned within 24 hours of delivery.</li>
                  <li>
                    It is unworn, unused, and in original packaging, with
                    receipt or proof or purchase.
                  </li>
                  <li>It has no damage or alteration.</li>
                </ul>
                <p className="mt-3 font-semibold">Non-returnable items:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Custom-made jewelry</li>
                  <li>Engraved pieces</li>
                  <li>Earrings (for hygiene reasons)</li>
                  <li>Discounted or clearance items</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">2. Refund Process</h3>
                <p>Refunds are not applicable.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">3. Exchanges</h3>
                <p>
                  Exchange requests must be made within 24 hours. Exchanges
                  depend on product availability.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">4. Return Shipping Costs</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Customer is responsible for sending back items</li>
                  <li>We advise using a trackable courier</li>
                  <li>We are not responsible for loss during return transit</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">
                  5. Damaged or Incorrect Orders
                </h3>
                <p>If you receive:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A damaged item</li>
                  <li>A defective item</li>
                  <li>The wrong product</li>
                </ul>
                <p className="mt-3">
                  Please contact us immediately at{" "}
                  <a
                    href="mailto:support@amalli.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@amalli.com
                  </a>{" "}
                  with photos and order details. We will arrange for a
                  replacement or resolution.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-3">Contact Us</h3>
            <p className="leading-relaxed">
              If you have any questions about these Terms of Service or our
              policies, please reach out to us:
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:support@amalli.com"
                  className="text-blue-600 hover:underline"
                >
                  support@amalli.com
                </a>
              </p>
              <p>
                <span className="font-medium">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/1234567890"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send us a message
                </a>
              </p>
            </div>
          </section>

          {/* Last Updated */}
          {/* <div className="pt-8 text-sm text-gray-500 text-center">
            Last updated: January {currentYear}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
