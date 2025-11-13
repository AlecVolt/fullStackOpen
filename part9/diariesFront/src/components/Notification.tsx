import './notification.css';
import type { NotificationData } from '../types';

const Notification = ({ notification }: { notification: NotificationData }) => {
  if (!notification) {
    return null;
  }

  return <div className={notification.style}>{notification.message}</div>;
};

export default Notification;
