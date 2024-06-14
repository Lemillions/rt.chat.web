// Notification.tsx
import React, { useEffect } from 'react';
import './index.sass';

interface NotificationProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning';
  removeNotification: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ id, message, type, removeNotification }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, removeNotification]);

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
