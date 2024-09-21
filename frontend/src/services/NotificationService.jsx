import { toast } from "react-toastify";

const NotificationService = {
  success: (message) => toast.success(message, { position: "top-center" }),
  error: (message) => toast.error(message, { position: "top-center" }),
  warning: (message) => toast.warning(message, { position: "top-center" }),
};

export default NotificationService;
