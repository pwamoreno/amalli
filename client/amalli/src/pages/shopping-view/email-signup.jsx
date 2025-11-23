import React, { useState } from "react";
import { Send } from "lucide-react";
import { PressableButton } from "@/components/common/pressable-button"; 
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { newsletterSignup } from "@/store/shop/newsletter-slice";

const EmailSignupSystem = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    if (email.length === 0) {
      toast("Email cannot be empty", {
        style: { background: "#fa113d", color: "white" },
      });

      return;
    }

    // console.log("Newsletter signup:", email);

    dispatch(newsletterSignup({ email })).then((data) => {
        // console.log(data);

      if (data?.payload?.success) {
        toast(`${data?.payload?.message}`, {
          style: { background: "#22c55e", color: "white" },
        });
      } else {
        toast("Email already subscribed", {
          style: { background: "#fa113d", color: "white" },
        });
      }
    });

    setEmail("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-4xl font-serif mb-4">Sign up for our newsletter</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Get exclusive deals, and be the first to see and get discounts on our
        new jewelry.
      </p>

      <div className="max-w-sm mx-auto">
        <div className="relative">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pr-12 h-12 bg-white border-gray-300"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewsletterSubmit(e);
              }
            }}
          />
          <PressableButton
            onClick={handleNewsletterSubmit}
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
          >
            <Send className="h-4 w-4 text-gray-600" />
          </PressableButton>
        </div>
      </div>
    </div>
  );
};

export default EmailSignupSystem;