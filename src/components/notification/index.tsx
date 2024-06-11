// Notification.js
import { useEffect } from 'react';
import './index.sass';

interface NotificationProps {
    id: number;
    message: string;
    type: 'success' | 'error';
    removeNotification: (id: number) => void;
}

const Notification = ({ id, message, type, removeNotification }: NotificationProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            removeNotification(id);
        }, 5000); // A notificação desaparece após 5 segundos

        return () => clearTimeout(timer);
    }, [id, removeNotification]);

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
};

export default Notification;
