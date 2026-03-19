import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  generateRandomDisruption,
  shouldTriggerClaim,
  getPayoutMultiplier,
} from '../utils/dsi';
import { showNotification } from '../utils/notifications';
import type { InsurancePlan, Policy } from '../types';

export function useDisruptionEngine() {
  const { user, refreshUser } = useAuth();
  const [currentDSI, setCurrentDSI] = useState(0);
  const [lastDisruption, setLastDisruption] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const processDisruption = async () => {
    if (!user || !user.zone_id) return;

    const disruption = generateRandomDisruption();
    setCurrentDSI(disruption.dsiScore);
    setLastDisruption(disruption.type);

    const { data: activePolicy } = await supabase
      .from('policies')
      .select('*, insurance_plans(*)')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .gte('end_date', new Date().toISOString().split('T')[0])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!activePolicy) return;

    const plan = activePolicy.insurance_plans as unknown as InsurancePlan;

    if (
      shouldTriggerClaim(
        disruption.dsiScore,
        plan.dsi_threshold,
        user.fraud_score
      )
    ) {
      await createClaim(activePolicy as Policy, plan, disruption);
    }

    await supabase.from('disruption_events').insert({
      zone_id: user.zone_id,
      event_type: disruption.type,
      severity: disruption.dsiScore,
      dsi_score: disruption.dsiScore,
      weather_score: disruption.weatherScore,
      traffic_score: disruption.trafficScore,
      platform_score: disruption.platformScore,
      affected_users: Math.floor(Math.random() * 50) + 10,
    });
  };

  const createClaim = async (
    policy: Policy,
    plan: InsurancePlan,
    disruption: ReturnType<typeof generateRandomDisruption>
  ) => {
    if (!user) return;

    const multiplier = getPayoutMultiplier(disruption.dsiScore);
    const payoutAmount = Math.round(plan.payout_per_day * multiplier);

    const { data: claim, error: claimError } = await supabase
      .from('claims')
      .insert({
        user_id: user.id,
        policy_id: policy.id,
        trigger_type: disruption.type,
        dsi_score: disruption.dsiScore,
        payout_amount: payoutAmount,
        status: 'approved',
        processed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (claimError) {
      console.error('Error creating claim:', claimError);
      return;
    }

    const newBalance = user.wallet_balance + payoutAmount;

    await supabase.from('transactions').insert({
      user_id: user.id,
      claim_id: claim.id,
      type: 'credit',
      amount: payoutAmount,
      reason: `Auto payout: ${disruption.type} (DSI: ${disruption.dsiScore})`,
      balance_after: newBalance,
    });

    await supabase
      .from('users')
      .update({ wallet_balance: newBalance })
      .eq('id', user.id);

    await refreshUser();

    const disruptionLabels: Record<string, string> = {
      rain: 'Heavy Rain',
      flood: 'Flooding',
      heat: 'Extreme Heat',
      app_crash: 'App Downtime',
      traffic: 'Heavy Traffic',
    };

    showNotification(
      'Payout Received!',
      `₹${payoutAmount} credited due to ${disruptionLabels[disruption.type]} in your area`,
      'success'
    );
  };

  useEffect(() => {
    if (user?.zone_id) {
      processDisruption();

      intervalRef.current = setInterval(() => {
        processDisruption();
      }, 15000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [user?.id, user?.zone_id]);

  return { currentDSI, lastDisruption };
}
