import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white max-md:text-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-serif text-center mt-12 mb-12">
          Privacy Policy
        </h1>

        {/* Content Container */}
        <div className="space-y-12 text-gray-700">
          <section className="space-y-6 leading-relaxed">
            <p>
              This Privacy Policy explains how Amalli, a jewelry business based
              in Lagos, Nigeria, collects, uses, discloses, and protects your
              personal information when you visit our website, purchase our
              products, or engage with us on any platform. We are committed to
              safeguarding your privacy in accordance with the Nigeria Data
              Protection Regulation (NDPR) and relevant global data-protection
              standards.
            </p>
            <p>
              By using and accessing any of the Services, you acknowledge that
              you have read this Privacy Policy and understand the collection,
              use, and disclosure of your information as described below.
            </p>

            {/* Section 1 */}
            <div>
              <h3 className="font-semibold mb-3">1. Information We Collect</h3>
              <p>
                We collect information to deliver our services effectively,
                improve customer experience, and comply with legal obligations.
              </p>

              <h4 className="font-semibold mt-4">1.1 Personal Information</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing and shipping address</li>
                <li>
                  Payment information (processed securely by third-party
                  processors; we do not store card details)
                </li>
                <li>
                  Identification information (for high-value purchases or fraud
                  prevention)
                </li>
              </ul>

              <h4 className="font-semibold mt-4">
                1.2 Automatically Collected Information
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Cookies and tracking technologies</li>
              </ul>

              <h4 className="font-semibold mt-4">
                1.3 Social Media Information
              </h4>
              <p>
                If you interact with us on platforms like Instagram, Facebook,
                TikTok, or WhatsApp, we may collect publicly available profile
                data and any information you share during communication.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="font-semibold mb-3">
                2. How We Use Your Information
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill orders</li>
                <li>Provide customer support</li>
                <li>Respond to inquiries</li>
                <li>Send order updates and confirmations</li>
                <li>Improve our product offerings and customer experience</li>
                <li>Conduct marketing campaigns (with your consent)</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="font-semibold mb-3">
                3. Legal Basis for Processing
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Consent — when you voluntarily provide information</li>
                <li>Contractual necessity — to process orders</li>
                <li>Legal obligation — tax and regulatory requirements</li>
                <li>
                  Legitimate interest — improving operations and customer
                  experience
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="font-semibold mb-3">
                4. How We Share Your Information
              </h3>
              <p>We do not sell or rent your personal information.</p>
              <p className="mt-3">We may share data with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (e.g., Paystack, Flutterwave)</li>
                <li>Delivery and logistics partners</li>
                <li>IT and website service providers</li>
                <li>Marketing providers (with your consent)</li>
                <li>
                  Law enforcement or regulatory authorities when required by law
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h3 className="font-semibold mb-3">
                5. Cookies and Tracking Technologies
              </h3>
              <p>We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enhance site functionality</li>
                <li>Remember preferences</li>
                <li>Analyze traffic</li>
                <li>Improve security</li>
              </ul>
              <p>
                You may disable cookies in your browser settings, but some
                features may not work properly.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="font-semibold mb-3">6. Data Retention</h3>
              <p>We retain personal data only as long as necessary for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Order fulfillment</li>
                <li>Customer service</li>
                <li>Legal compliance</li>
                <li>Warranty and product support</li>
                <li>Business recordkeeping</li>
              </ul>
              <p>Typically, data is retained for up to 5 years.</p>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="font-semibold mb-3">7. Data Security</h3>
              <p>
                We implement appropriate technical and organizational measures,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption</li>
                <li>Secure servers</li>
                <li>Access controls</li>
                <li>Regular audits</li>
                <li>Firewalls and anti-malware protections</li>
              </ul>
              <p>
                While we strive for maximum security, no system is completely
                risk-free.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="font-semibold mb-3">
                8. Your Rights Under the NDPR
              </h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct or update your information</li>
                <li>Request deletion (“right to be forgotten”)</li>
                <li>Withdraw consent</li>
                <li>Opt out of marketing</li>
                <li>Request data portability</li>
                <li>
                  File complaints with the Nigeria Data Protection Bureau (NDPB)
                </li>
              </ul>
            </div>

            {/* Section 9 */}
            <div>
              <h3 className="font-semibold mb-3">
                9. International Data Transfers
              </h3>
              <p>
                If your data is transferred outside Nigeria (e.g., cloud
                storage), we ensure NDPR-compliant safeguards are in place.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h3 className="font-semibold mb-3">10. Children’s Privacy</h3>
              <p>
                We do not knowingly collect data from children under 18. If you
                believe such data has been provided, contact us immediately.
              </p>
            </div>

            {/* Section 11 */}
            <div>
              <h3 className="font-semibold mb-3">11. Third-Party Links</h3>
              <p>
                Our website may contain external links. We are not responsible
                for the privacy practices or content of third-party websites.
              </p>
            </div>

            {/* Section 12 */}
            <div>
              <h3 className="font-semibold mb-3">
                12. Changes to This Privacy Policy
              </h3>
              <p>
                We may update this Privacy Policy periodically. Updated versions
                will include a revised “Last Updated” date. Continued use of our
                services indicates acceptance of the updated terms.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
