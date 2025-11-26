// import { getCurrentDateInfo } from "@/lib/utils";
import React from "react";

const RefundPolicyPage = () => {
//   const { year: currentYear } = getCurrentDateInfo();
  return (
    <div className="min-h-screen bg-white  max-md:text-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-serif text-center mt-12 mb-12">
          Refund Policy
        </h1>

        {/* Content Container */}
        <div className="space-y-12 text-gray-700">
          {/* Return & Refund Policy */}
          <section>
            <h2 className="text-xl font-bold uppercase mb-6 tracking-wide">
              RETURN & REFUND POLICY
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
                    support@amallijewelry.com
                  </a>{" "}
                  with photos and order details. We will arrange for a
                  replacement or resolution.
                </p>
              </div>
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

export default RefundPolicyPage;




