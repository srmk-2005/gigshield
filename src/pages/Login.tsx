import { useState } from 'react';
import { Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setShowOTP(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 4) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">GigShield</h1>
          <p className="text-blue-100">AI-Powered Income Protection</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-4 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {showOTP && (
              <div className="animate-slide-up">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.replace(/\D/g, ''))}
                  placeholder="1234"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-center text-2xl tracking-widest"
                />
              </div>
            )}

            {!showOTP ? (
              <button
                onClick={handleSendOTP}
                disabled={phone.length !== 10}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition transform hover:scale-105 active:scale-95"
              >
                Send OTP
              </button>
            ) : (
              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 4}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition transform hover:scale-105 active:scale-95"
              >
                Verify & Login
              </button>
            )}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Protected by 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
}
