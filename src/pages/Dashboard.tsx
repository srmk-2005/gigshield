import { useState, useEffect } from 'react';
import {
  Bell,
  MapPin,
  Shield,
  Home,
  CreditCard,
  FileText,
  LogOut
} from 'lucide-react';
import DSIScore from '../components/DSIScore';
import Wallet from '../components/Wallet';
import Plans from '../components/Plans';
import DisruptionAlert from '../components/DisruptionAlert';
import Toast from '../components/Toast';
import { Transaction } from '../types';
import {
  generateDSI,
  shouldTriggerDisruption,
  getRandomDisruption
} from '../utils/simulation';

interface DashboardProps {
  onLogout: () => void;
}

type Tab = 'home' | 'wallet' | 'plans' | 'claims';

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [dsiScore, setDSIScore] = useState(45);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showDisruption, setShowDisruption] = useState(false);
  const [currentDisruption, setCurrentDisruption] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [notificationPulse, setNotificationPulse] = useState(false);

  useEffect(() => {
    const dsiInterval = setInterval(() => {
      setDSIScore(generateDSI());
    }, 5000);

    return () => clearInterval(dsiInterval);
  }, []);

  useEffect(() => {
    const disruptionInterval = setInterval(() => {
      if (shouldTriggerDisruption() && !showDisruption) {
        const disruption = getRandomDisruption();
        setCurrentDisruption(disruption);
        setShowDisruption(true);
        setNotificationPulse(true);

        setBalance((prev) => prev + disruption.payout);
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          date: new Date(),
          event: disruption.message,
          amount: disruption.payout,
          icon: disruption.icon
        };
        setTransactions((prev) => [newTransaction, ...prev]);

        setToastMessage(`₹${disruption.payout} credited to your wallet instantly 💸`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setTimeout(() => setNotificationPulse(false), 1000);
      }
    }, 8000);

    return () => clearInterval(disruptionInterval);
  }, [showDisruption]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Hello Ramesh 👋
                  </h2>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Ambattur, Chennai</span>
                  </div>
                </div>
                <div
                  className={`relative ${
                    notificationPulse ? 'animate-bounce' : ''
                  }`}
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  {transactions.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                      {transactions.length}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                    <p className="font-bold text-gray-800">SafeShield Pro</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DSIScore score={dsiScore} />

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Payouts</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{transactions.reduce((sum, txn) => sum + txn.amount, 0)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Protected Days</p>
                  <p className="text-2xl font-bold text-green-600">127</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'wallet':
        return <Wallet balance={balance} transactions={transactions} />;

      case 'plans':
        return (
          <Plans selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
        );

      case 'claims':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Claim History
            </h3>
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400">No claims yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{txn.icon}</div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {txn.event}
                          </p>
                          <p className="text-xs text-gray-500">
                            {txn.date.toLocaleString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        ₹{txn.amount}
                      </span>
                    </div>
                    <div className="bg-green-50 rounded-lg px-3 py-2 inline-block">
                      <span className="text-xs font-medium text-green-700">
                        Auto-approved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 pb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-white">GigShield</span>
            </div>
            <button
              onClick={onLogout}
              className="text-white hover:text-blue-100 transition"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-4 -mt-6">{renderContent()}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'wallet' ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-xs font-medium">Wallet</span>
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'plans' ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Shield className="w-6 h-6" />
              <span className="text-xs font-medium">Plans</span>
            </button>
            <button
              onClick={() => setActiveTab('claims')}
              className={`flex flex-col items-center gap-1 transition relative ${
                activeTab === 'claims' ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-xs font-medium">Claims</span>
              {transactions.length > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {transactions.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {showDisruption && currentDisruption && (
        <DisruptionAlert
          disruption={currentDisruption}
          onClose={() => setShowDisruption(false)}
        />
      )}

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
