// NotificationsBar.jsx
import React, { useRef } from "react";

const NotificationsBar = ({ notifications }) => {
  const repeatedNotifications = [...notifications, ...notifications]; // loop smoothly
  const containerRef = useRef(null);

  return (
    <div className="w-full bg-gray-100 overflow-hidden h-8 flex items-center relative">
      <div
        ref={containerRef}
        className="marquee whitespace-nowrap flex items-center"
      >
        {repeatedNotifications.map((note, idx) => (
          <span
            key={idx}
            className="mx-12 text-gray-900"
          >
            {note}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused; /* pause on hover */
        }
      `}</style>
    </div>
  );
};

export default NotificationsBar;
