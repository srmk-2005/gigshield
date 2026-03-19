import { AlertTriangle, X } from 'lucide-react';
import { DisruptionEvent } from '../types';

interface DisruptionAlertProps {
  disruption: DisruptionEvent;
  onClose: () => void;
}

export default function DisruptionAlert({
  disruption,
  onClose
}: DisruptionAlertProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-scale-up">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
              {disruption.icon}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-gray-800">
                Disruption Detected
              </h3>
            </div>
            <p className="text-gray-600">{disruption.message}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-800 mb-2">
              Auto-protection activated
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Payout Amount</span>
              <span className="text-2xl font-bold text-green-600">
                ₹{disruption.payout}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition transform hover:scale-105"
          >
            Got it, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
