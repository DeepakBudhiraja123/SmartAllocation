import Notification from "../models/Notification.js";

// Add a new notification
export const addNotification = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const newNotification = new Notification({ message });
    await newNotification.save();

    res.status(201).json({
      success: true,
      message: "Notification added successfully",
      data: newNotification,
    });
  } catch (err) {
    console.error("Error adding notification:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Get all notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Edit a notification
export const editNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const updated = await Notification.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification updated", data: updated });
  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (err) {
    console.error("Error deleting notification:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
