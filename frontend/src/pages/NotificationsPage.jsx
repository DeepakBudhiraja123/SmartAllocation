import React, { useState, useContext } from "react";
import { NotificationsContext } from "../../context/notificationsContext";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const NotificationsPage = () => {
  const {
    notifications,
    addNotification,
    editNotification,
    deleteNotification,
  } = useContext(NotificationsContext);

  const [newMessage, setNewMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingMessage, setEditingMessage] = useState("");

  const handleAdd = async () => {
    if (!newMessage.trim()) return toast.error("Message cannot be empty");
    await addNotification(newMessage);
    setNewMessage("");
  };

  const handleEdit = async () => {
    if (!editingMessage.trim()) return toast.error("Message cannot be empty");
    await editNotification(editingId, editingMessage);
    setEditingId(null);
    setEditingMessage("");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>

      {/* Add New Notification */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter notification message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FiPlus />
          Add Notification
        </button>
      </div>

      {/* Notifications List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No notifications available.
          </p>
        )}

        {notifications.map((n) => (
          <div
            key={n._id}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col justify-between h-full"
          >
            {/* Message */}
            {editingId === n._id ? (
              <textarea
                value={editingMessage}
                onChange={(e) => setEditingMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows={3}
              />
            ) : (
              <p className="text-gray-700 text-base">{n.message}</p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
              {editingId === n._id ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded-lg transition flex items-center gap-1"
                  >
                    <FiX /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(n._id);
                      setEditingMessage(n.message);
                    }}
                    className="text-yellow-500 hover:text-yellow-700 transition"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => deleteNotification(n._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Timestamp */}
            <p className="text-gray-400 text-sm mt-2">
              Created: {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
