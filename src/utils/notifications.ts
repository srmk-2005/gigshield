export function showNotification(
  title: string,
  message: string,
  type: 'success' | 'error' | 'info' = 'info'
) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body: message,
      icon: '/vite.svg',
    });
  }

  const event = new CustomEvent('gigshield-notification', {
    detail: { title, message, type },
  });
  window.dispatchEvent(event);
}

export async function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    await Notification.requestPermission();
  }
}
