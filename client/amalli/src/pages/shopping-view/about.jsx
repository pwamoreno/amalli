import React from "react";
import AboutImg from "../../assets/banner1.jpg";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const AboutUs = () => {

  const [_searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
  // Clear any lingering search params
  setSearchParams({});
  // Clear filters from storage too
  sessionStorage.removeItem("filters");
}, []);

  return (
    <div className="md:min-h-screen flex items-center justify-center px-4 py-6">
      <div className="max-w-2xl w-full">
        {/* About Us Title with underline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif mb-2">About Us</h1>
          <div className="w-16 h-1 bg-black mx-auto"></div>
        </div>

        {/* Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={AboutImg}
            alt="about image"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Greeting */}
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-6">
          Hey There!
        </h2>

        {/* Description */}
        <div className="text-center space-y-4 mb-8">
          <p className="text-base md:text-lg leading-relaxed">
            Welcome to our store. We&apos;re a jewelry business based out
            of Lagos and we sell timeless pieces that will see you through
            different phases of life. We&apos;re so grateful you stopped by. Do send
            us an email for any inquiries or support needs. We&apos;d love to hear
            from you.
          </p>
        </div>

        {/* Signature */}
        <div className="text-center">
          <p className="text-lg mb-4">Lots of Love,</p>
          <p className="text-3xl md:text-4xl font-pacifico italic">Napwa</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
