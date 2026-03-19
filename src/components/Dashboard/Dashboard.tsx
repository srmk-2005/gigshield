import { useState, useEffect } from 'react';
import { Shield, TrendingUp, Calendar, Wallet, AlertCircle, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDisruptionEngine } from '../../hooks/useDisruptionEngine';
import { supabase } from '../../lib/supabase';
import { getRiskLevel } from '../../utils/dsi';
import type { Policy, InsurancePlan, Claim } from '../../types';
import { PlansModal } from './PlansModal';
import { WalletModal } from './WalletModal';
import { ClaimsModal } from './ClaimsModal';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const { currentDSI, lastDisruption } = useDisruptionEngine();
  const [activePolicy, setActivePolicy] = useState<(Policy & { plan: InsurancePlan }) | null>(null);
  const [recentClaims, setRecentClaims] = useState<Claim[]>([]);
  const [monthlyStats, setMonthlyStats] = useState({ earnings: 0, claims: 0 });
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showClaimsModal, setShowClaimsModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      const { data: policy } = await supabase
        .from('policies')
        .select('*, insurance_plans(*)')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .gte('end_date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (policy) {
        setActivePolicy({
          ...policy,
          plan: policy.insurance_plans as unknown as InsurancePlan,
        });
      }

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: claims } = await supabase
        .from('claims')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false });

      if (claims) {
        setRecentClaims(claims);
        const totalEarnings = claims.reduce((sum, c) => sum + c.payout_amount, 0);
        setMonthlyStats({ earnings: totalEarnings, claims: claims.length });
      }
    };

    fetchDashboardData();
  }, [user]);

  if (!user) return null;

  const riskLevel = getRiskLevel(currentDSI);
  const riskColors = {
    Low: 'text-green-600 bg-green-50',
    Medium: 'text-yellow-600 bg-yellow-50',
    High: 'text-red-600 bg-red-50',
  };

  const disruptionLabels: Record<string, string> = {
    rain: 'Rain',
    flood: 'Flood',
    heat: 'Heat',
    app_crash: 'App Issue',
    traffic: 'Traffic',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GigShield</h1>
              <p className="text-xs text-gray-600">Hello, {user.name}</p>
            </div>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {showMenu && (
          <div className="max-w-4xl mx-auto px-4 pb-4 border-t border-gray-200">
            <button
              onClick={() => {
                signOut();
                setShowMenu(false);
              }}
              className="flex items-center gap-2 w-full p-3 mt-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Current Plan</p>
              <h2 className="text-2xl font-bold">
                {activePolicy ? activePolicy.plan.name : 'No Active Plan'}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-1">Coverage Status</p>
              <p className="text-lg font-semibold">
                {activePolicy ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>

          {activePolicy && (
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-500">
              <div>
                <p className="text-blue-100 text-sm">Weekly Premium</p>
                <p className="text-xl font-bold">₹{activePolicy.plan.price_weekly}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Max Payout</p>
                <p className="text-xl font-bold">₹{activePolicy.plan.max_weekly_payout}</p>
              </div>
            </div>
          )}

          {!activePolicy && (
            <button
              onClick={() => setShowPlansModal(true)}
              className="mt-4 w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Choose a Plan
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Today's Risk Level</h3>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">{currentDSI}</span>
                <span className="text-gray-500">/ 100</span>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${riskColors[riskLevel]}`}>
                {riskLevel} Risk
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">DSI Score</p>
              {lastDisruption && (
                <p className="text-xs text-gray-500">
                  Last: {disruptionLabels[lastDisruption] || lastDisruption}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                riskLevel === 'Low'
                  ? 'bg-green-500'
                  : riskLevel === 'Medium'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${currentDSI}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">₹{monthlyStats.earnings}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Earnings Protected</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{monthlyStats.claims}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Claims Received</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowWalletModal(true)}
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all"
            >
              <Wallet className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Wallet</p>
                <p className="text-sm text-gray-600">₹{user.wallet_balance}</p>
              </div>
            </button>

            <button
              onClick={() => setShowClaimsModal(true)}
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all"
            >
              <Calendar className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Claims</p>
                <p className="text-sm text-gray-600">View History</p>
              </div>
            </button>
          </div>
        </div>

        {recentClaims.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Claims</h3>
            <div className="space-y-3">
              {recentClaims.slice(0, 3).map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {disruptionLabels[claim.trigger_type] || claim.trigger_type}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(claim.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+₹{claim.payout_amount}</p>
                    <p className="text-xs text-gray-500">DSI: {claim.dsi_score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showPlansModal && (
        <PlansModal onClose={() => setShowPlansModal(false)} />
      )}

      {showWalletModal && (
        <WalletModal onClose={() => setShowWalletModal(false)} />
      )}

      {showClaimsModal && (
        <ClaimsModal onClose={() => setShowClaimsModal(false)} />
      )}
    </div>
  );
}
