import mongoose from "mongoose";
const notificationSchema = mongoose.Schema(
  {
    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel;
