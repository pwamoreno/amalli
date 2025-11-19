import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { MessageSquareMore } from "lucide-react";
import { faqs } from "@/config";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function FAQPage() {

  const [_searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
  // Clear any lingering search params
  setSearchParams({});
  // Clear filters from storage too
  sessionStorage.removeItem("filters");
}, []);
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold mb-8">FAQs</h1>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-md bg-gray-50 px-3"
          >
            <AccordionTrigger className="flex justify-between py-4 text-left hover:no-underline">
              <div className="flex items-center gap-2">
                <MessageSquareMore size={18} className="text-gray-500" />
                <span className="font-medium text-gray-800 text-sm">
                  {faq.question}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-4 text-sm text-gray-600 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
