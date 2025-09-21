import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch all notifications from backend
  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/api/notifications/get");
      if (data.success) {
        setNotifications(data.data);
      } else {
        toast.error("Failed to fetch notifications");
      }
    } catch (err) {
      toast.error(err.message || "Error fetching notifications");
    }
  };

  // Add a new notification
  const addNotification = async (message) => {
    try {
      const { data } = await axios.post("/api/notifications/post", { message });
      if (data.success) {
        setNotifications((prev) => [data.data, ...prev]);
        toast.success(data.message || "Notification added");
      } else {
        toast.error(data.message || "Failed to add notification");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to add notification");
    }
  };

  // Edit a notification
  const editNotification = async (id, message) => {
    try {
      const { data } = await axios.put(`/api/notifications/put/${id}`, { message });
      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? data.data : n))
        );
        toast.success(data.message || "Notification updated");
      } else {
        toast.error(data.message || "Failed to update notification");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update notification");
    }
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      const { data } = await axios.delete(`/api/notifications/delete/${id}`);
      if (data.success) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        toast.success(data.message || "Notification deleted");
      } else {
        toast.error(data.message || "Failed to delete notification");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to delete notification");
    }
  };

  // Fetch notifications once on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const value = {
    notifications,
    fetchNotifications,
    addNotification,
    editNotification,
    deleteNotification,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
