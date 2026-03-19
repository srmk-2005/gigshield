import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
}

export default function Toast({ message, show }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div className="bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 max-w-sm border border-green-200">
        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
}
