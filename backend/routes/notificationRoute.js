import express from "express";
import {
  addNotification,
  getNotifications,
  editNotification,
  deleteNotification,
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.post("/post", addNotification);          // Add new notification
notificationRouter.get("/get", getNotifications);          // Get all notifications
notificationRouter.put("/put/:id", editNotification);       // Edit notification by ID
notificationRouter.delete("/delete/:id", deleteNotification);  // Delete notification by ID

export default notificationRouter;