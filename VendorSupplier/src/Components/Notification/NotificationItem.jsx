import { formatDistanceToNow } from "date-fns";
import { NavLink } from "react-router-dom";

const NotificationItem = ({ notification }) => {
  const formattedDate = formatDistanceToNow(new Date(notification?.createdAt), {
    addSuffix: true,
  });

  return (
    <li key={notification._id} className="hover:bg-gray-200 p-2">
      <NavLink to={`/notifications/${notification._id}`}>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{notification?.message}</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default NotificationItem;
