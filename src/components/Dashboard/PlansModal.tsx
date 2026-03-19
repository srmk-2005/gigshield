import { useState, useEffect } from 'react';
import { X, Check, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import type { InsurancePlan } from '../../types';

export function PlansModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data } = await supabase
        .from('insurance_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_weekly');

      if (data) setPlans(data);
    };
    fetchPlans();
  }, []);

  const handleActivate = async () => {
    if (!user || !selectedPlan) return;

    setLoading(true);
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 7);

      const plan = plans.find((p) => p.id === selectedPlan);
      if (!plan) return;

      await supabase.from('policies').insert({
        user_id: user.id,
        plan_id: selectedPlan,
        start_date: today.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        status: 'active',
        premium_paid: plan.price_weekly,
      });

      window.location.reload();
    } catch (error) {
      console.error('Error activating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      ₹{plan.price_weekly}
                      <span className="text-sm text-gray-600 font-normal">/week</span>
                    </p>
                  </div>
                </div>
                {selectedPlan === plan.id && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-t border-gray-200">
                  <span className="text-gray-600">Daily Payout</span>
                  <span className="font-semibold text-gray-900">₹{plan.payout_per_day}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-200">
                  <span className="text-gray-600">Max Weekly Payout</span>
                  <span className="font-semibold text-gray-900">₹{plan.max_weekly_payout}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-200">
                  <span className="text-gray-600">DSI Threshold</span>
                  <span className="font-semibold text-gray-900">{plan.dsi_threshold}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <button
            onClick={handleActivate}
            disabled={!selectedPlan || loading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Activating...' : 'Activate Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}
