import { useEffect } from "react";

export default function HolidayGreeting({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000); // auto close after 5 sec
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md text-center animate-in fade-in slide-in-from-bottom">
        <h2 className="text-2xl font-semibold mb-2">Greetings!</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
