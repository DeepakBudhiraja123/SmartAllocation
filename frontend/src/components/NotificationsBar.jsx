// NotificationsBar.jsx
import React, { useContext, useRef } from "react";
import { NotificationsContext } from "../../context/notificationsContext";

const NotificationsBar = () => {
  const { notifications } = useContext(NotificationsContext);
  const containerRef = useRef(null);

  // Extract message text and handle empty notifications
  const messages = notifications.length
    ? notifications.map((n) => n.message)
    : ["No notifications yet"];

  // Duplicate array for smooth looping
  const repeatedNotifications = [...messages, ...messages];

  return (
    <div className="w-full bg-gray-100 overflow-hidden h-8 flex items-center relative">
      <div
        ref={containerRef}
        className="marquee whitespace-nowrap flex items-center"
      >
        {repeatedNotifications.map((msg, idx) => (
          <span key={idx} className="mx-12 text-gray-900">
            {msg}
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
