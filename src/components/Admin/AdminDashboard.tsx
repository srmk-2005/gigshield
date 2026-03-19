import { useState, useEffect } from 'react';
import { Shield, Users, DollarSign, Activity, AlertTriangle, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Stats {
  totalUsers: number;
  activePolicies: number;
  totalPayouts: number;
  recentEvents: Array<{
    zone: string;
    dsi: number;
    type: string;
    time: string;
  }>;
}

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activePolicies: 0,
    totalPayouts: 0,
    recentEvents: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [usersResult, policiesResult, claimsResult, eventsResult] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase
          .from('policies')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'active'),
        supabase.from('claims').select('payout_amount'),
        supabase
          .from('disruption_events')
          .select('*, zones(name)')
          .order('created_at', { ascending: false })
          .limit(10),
      ]);

      const totalPayouts = claimsResult.data?.reduce(
        (sum, claim) => sum + claim.payout_amount,
        0
      ) || 0;

      const recentEvents = eventsResult.data?.map((event: { zones: { name: string } | null; dsi_score: number; event_type: string; created_at: string }) => ({
        zone: event.zones?.name || 'Unknown',
        dsi: event.dsi_score,
        type: event.event_type,
        time: new Date(event.created_at).toLocaleTimeString(),
      })) || [];

      setStats({
        totalUsers: usersResult.count || 0,
        activePolicies: policiesResult.count || 0,
        totalPayouts,
        recentEvents,
      });

      setLoading(false);
    };

    fetchStats();

    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GigShield Admin</h1>
              <p className="text-xs text-gray-600">System Monitoring</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Policies</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activePolicies}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Payouts</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalPayouts}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Live DSI Events</h2>
          </div>

          {stats.recentEvents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent events
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      event.dsi >= 60 ? 'bg-red-500' :
                      event.dsi >= 30 ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {event.zone}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {event.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      {event.dsi}
                    </p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">DSI Heatmap</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.recentEvents.slice(0, 8).map((event, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  event.dsi >= 60
                    ? 'bg-red-100 border-2 border-red-300'
                    : event.dsi >= 30
                    ? 'bg-yellow-100 border-2 border-yellow-300'
                    : 'bg-green-100 border-2 border-green-300'
                }`}
              >
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {event.zone}
                </p>
                <p className="text-2xl font-bold text-gray-900">{event.dsi}</p>
                <p className="text-xs text-gray-600 mt-1 capitalize">
                  {event.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
