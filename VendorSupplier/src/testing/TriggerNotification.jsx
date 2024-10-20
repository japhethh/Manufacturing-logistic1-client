import verifyStore from '../context/verifyStore'


const NotificationTrigger = () => {
  const addNotification = verifyStore((state) => state.addNotification);

  const handleNewNotification = () => {
    const newNotification = {
      id: Math.random().toString(36).substr(2, 9), // generate unique id
      message: 'New order received!',
    };
    addNotification(newNotification);
  };

  return (
    <div>
      <button onClick={handleNewNotification}>New Order Notification</button>
    </div>
  );
};

export default NotificationTrigger;
