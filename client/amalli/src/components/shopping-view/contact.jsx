// import { getCurrentDateInfo } from "@/lib/utils";
import React from "react";

const ContactPage = () => {
  //   const { year: currentYear } = getCurrentDateInfo();
  return (
    <div className="min-h-screen/2 bg-white max-md:text-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-serif text-center mt-12 mb-12">
          Contact Us
        </h1>

        {/* Content Container */}
        <div className="space-y-12 text-gray-700">
          {/* Contact Information */}
          <section className="pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-3">Contact Us</h3>
            <p className="leading-relaxed">
              If you have any questions about the Terms of Service, policies or
              any other inquiries, please reach out to us:
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:support@amalli.com"
                  className="text-blue-600 hover:underline"
                >
                  support@amallijewelry.com
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

export default ContactPage;
