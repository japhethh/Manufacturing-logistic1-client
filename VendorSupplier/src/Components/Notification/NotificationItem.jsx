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
    <li
      key={notification._id}
      className={`hover:bg-gray-200 p-2 ${
        notification?.isRead ? "bg-gray-100" : ""
      }`}
      onClick={handleMarkAsRead} // Mark as read on click
      className="hover:bg-gray-200 p-2"
    >
      <NavLink to={`/notifications/${notification?._id}`}>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{notification?.message}</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default NotificationItem;