import { useState, useEffect } from 'react';
import { X, Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import type { Transaction } from '../../types';

export function WalletModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) setTransactions(data);
      setLoading(false);
    };

    fetchTransactions();
  }, [user]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-7 h-7 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Wallet</h2>
              <p className="text-sm text-gray-600">Current Balance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 mb-6">
            <p className="text-blue-100 text-sm mb-1">Available Balance</p>
            <p className="text-4xl font-bold">₹{user?.wallet_balance || 0}</p>
            <p className="text-blue-100 text-sm mt-4">
              Your earnings are automatically credited
            </p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4">Transaction History</h3>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions yet
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {txn.type === 'credit' ? (
                      <ArrowDownCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <ArrowUpCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {txn.reason || txn.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(txn.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                    </p>
                    <p className="text-xs text-gray-500">
                      Bal: ₹{txn.balance_after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
