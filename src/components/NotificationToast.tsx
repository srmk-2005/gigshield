import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function NotificationToast() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleNotification = (event: Event) => {
      const customEvent = event as CustomEvent<{
        title: string;
        message: string;
        type: 'success' | 'error' | 'info';
      }>;

      const notification: Notification = {
        id: Date.now().toString(),
        ...customEvent.detail,
      };

      setNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 5000);
    };

    window.addEventListener('gigshield-notification', handleNotification);
    return () => {
      window.removeEventListener('gigshield-notification', handleNotification);
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const icons = {
    success: <CheckCircle className="w-6 h-6 text-green-600" />,
    error: <XCircle className="w-6 h-6 text-red-600" />,
    info: <Info className="w-6 h-6 text-blue-600" />,
  };

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${colors[notification.type]} border-2 rounded-lg p-4 shadow-lg animate-slide-in`}
        >
          <div className="flex items-start gap-3">
            {icons[notification.type]}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{notification.title}</p>
              <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="p-1 hover:bg-white rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
