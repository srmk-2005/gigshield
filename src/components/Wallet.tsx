import { Wallet as WalletIcon, ArrowUpRight } from 'lucide-react';
import { Transaction } from '../types';

interface WalletProps {
  balance: number;
  transactions: Transaction[];
}

export default function Wallet({ balance, transactions }: WalletProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Wallet</h3>
        <WalletIcon className="w-5 h-5 text-blue-600" />
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 mb-6 shadow-md">
        <p className="text-blue-100 text-sm mb-2">Available Balance</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">₹{balance}</span>
        </div>
        <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition transform hover:scale-105">
          Withdraw
        </button>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Recent Transactions
        </h4>
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">
            No transactions yet
          </p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
                    {txn.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {txn.event}
                    </p>
                    <p className="text-xs text-gray-500">
                      {txn.date.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <span>+₹{txn.amount}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
