import { formatDistanceToNow } from "date-fns";
import { NavLink } from "react-router-dom";
import { apiURL } from "../../context/verifyStore";
import { toast } from "react-toastify";
import axios from "axios";

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const formattedDate = formatDistanceToNow(new Date(notification?.createdAt), {
    addSuffix: true,
  });

  console.log(notification);
  const handleMarkAsRead = async () => {
    try {
      const response = await axios.put(
        `${apiURL}/api/notifications/updateMarkAsRead/${notification?._id}`,
        {
          isRead: true,
        }
      );

      console.log(response.data.message);

      onMarkAsRead(notification?._id);
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  return (
    <div
      className={`hover:bg-gray-200 rounded-md cursor-pointer shadow-sm transition-all duration-200 ease-in-out p-4 flex items-start gap-4 ${
        notification.isRead ? 'bg-gray-100' : 'bg-blue-50'
      }`}
      onClick={onMarkAsRead}
    >
      <NavLink to={`/notifications/${notification._id}`} className="flex-grow">
        <div className="flex flex-col items-start gap-2">
          <span className="font-semibold text-xs truncate">
            {notification.message}
          </span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
      </NavLink>
      {!notification.isRead && (
        <div className="w-2 h-2 bg-primary rounded-full" />
      )}
    </div>
  );
};

export default NotificationItem;
