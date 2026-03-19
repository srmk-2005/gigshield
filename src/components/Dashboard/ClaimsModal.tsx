import { useState, useEffect } from 'react';
import { X, FileText, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import type { Claim } from '../../types';

export function ClaimsModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('claims')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (data) setClaims(data);
      setLoading(false);
    };

    fetchClaims();
  }, [user]);

  const disruptionLabels: Record<string, string> = {
    rain: 'Heavy Rain',
    flood: 'Flooding',
    heat: 'Extreme Heat',
    app_crash: 'App Downtime',
    traffic: 'Heavy Traffic',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Claims History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : claims.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No claims yet. Your automatic payouts will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {claims.map((claim) => (
                <div
                  key={claim.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {claim.status === 'approved' ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {disruptionLabels[claim.trigger_type] || claim.trigger_type}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(claim.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        ₹{claim.payout_amount}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {claim.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">DSI Score</span>
                    <span className="font-semibold text-gray-900">
                      {claim.dsi_score}
                    </span>
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
