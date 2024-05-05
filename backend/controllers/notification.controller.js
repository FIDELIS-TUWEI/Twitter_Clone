const Notification = require("../models/notification.model");
const logger = require("../utils/logger");

const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({ to: userId })
            .populate({
                path: "from",
                select: "username profileImg"
            });

        // update notification in DB
        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notifications);

    } catch (error) {
        logger.error("Error in getNotifications controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        // delete notifications in DB
        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully" });

    } catch (error) {
        logger.error("Error in deleteNotifications controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user._id;
        const notification = await Notification.findById(notificationId);

        if (!notification) return res.status(404).json({ error: "Notification not found" });

        if (notification.to.toString() !== userId.toString()) {
            return res.status(400).json({ error: "You are not allowed to delete this notification" });
        }

        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        logger.error("Error in deleteNotification controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getNotifications, deleteNotifications, deleteNotification
};