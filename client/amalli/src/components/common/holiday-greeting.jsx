import { useEffect } from "react";

export default function HolidayGreeting({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 8000); // auto close after 8 sec
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-yellow-500/20 backdrop-blur-sm flex items-center justify-center z-[999]">
      {/* Falling confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-yellow-500",
            "bg-green-500",
            "bg-purple-500",
            "bg-pink-500",
          ];
          const shapes = ["rounded-sm", "rounded-full"];
          return (
            <div
              key={i}
              className={`absolute ${
                colors[Math.floor(Math.random() * colors.length)]
              } ${shapes[Math.floor(Math.random() * shapes.length)]}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 12}px`,
                animation: `fall ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.7,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          );
        })}
      </div>
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(${Math.random() * 720}deg);
          }
        }
      `}</style>

      {/* Main card */}
      <div className="relative bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center animate-in fade-in slide-in-from-bottom border-2 border-purple-200">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg text-xl">
            🎉
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Greetings!
        </h2>
        <p className="text-gray-700 text-lg">{message}</p>

        <div className="mt-6 flex justify-center gap-2">
          {["🎊", "🎊", "🎊", "🎊", "🎊"].map((emoji, i) => (
            <span
              key={i}
              className="text-xl animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
