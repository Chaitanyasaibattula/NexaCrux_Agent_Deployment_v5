import { useApp } from '../contexts/AppContext';
import { Package, Grid3x3, Users, LogOut, Building2, Activity, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { logout, deliveries, lockers, residents } = useApp();

  const occupiedCount = lockers.filter(l => l.status === 'occupied').length;
  const occupancyRate = Math.round((occupiedCount / lockers.length) * 100);
  const staleCount = deliveries.filter(d => d.status === 'Stale' || d.daysInLocker > 7).length;
  const todayDeliveries = deliveries.length;

  return (
    <div className="min-h-screen bg-nexa-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-nexa-charcoal/95 backdrop-blur-xl border-b border-yellow-500/20 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
              <span className="font-space font-bold text-black">A</span>
            </div>
            <div>
              <h1 className="font-space font-bold text-white text-sm">System Admin</h1>
              <p className="text-xs text-yellow-400">Full Access Control</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexa-surface border border-yellow-500/30">
            <Building2 className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white font-semibold">Prism</span>
          </div>
          <button 
            onClick={logout}
            className="w-9 h-9 rounded-lg bg-nexa-surface border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        {/* KPI Cards */}
        <div className="px-6 py-6">
          <div className="mb-6">
            <h2 className="font-space font-bold text-2xl text-white mb-2">Building Overview: Prism</h2>
            <p className="text-gray-400 text-sm">Real-time system monitoring and analytics</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-4 border-l-4 border-l-yellow-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Today's Deliveries</p>
                  <h3 className="text-2xl font-bold text-white font-mono">{todayDeliveries}</h3>
                  <div className="flex items-center gap-1 mt-1 text-green-400 text-xs">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4 border-l-4 border-l-green-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Locker Occupancy</p>
                  <h3 className="text-2xl font-bold text-white font-mono">{occupancyRate}%</h3>
                  <div className="flex items-center gap-1 mt-1 text-green-400 text-xs">
                    <Activity className="w-3 h-3" />
                    <span>Optimal</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Grid3x3 className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4 border-l-4 border-l-blue-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Active Residents</p>
                  <h3 className="text-2xl font-bold text-white font-mono">{residents.length}</h3>
                  <div className="flex items-center gap-1 mt-1 text-blue-400 text-xs">
                    <span>Registered</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-4 border-l-4 border-l-red-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Stale Deliveries</p>
                  <h3 className="text-2xl font-bold text-white font-mono">{staleCount}</h3>
                  <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>Requires Attention</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Dashboard Content */}
        <div className="px-6 pb-6">
          <div className="glass-card rounded-xl p-8 text-center border border-yellow-500/20">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Building2 className="w-10 h-10 text-black" />
              </div>
              <h2 className="font-space font-bold text-3xl mb-4">Admin Dashboard Active</h2>
              <p className="text-gray-400 mb-6">
                You have full administrative access to the <span className="text-yellow-400 font-semibold">Prism</span> building management system.
                Monitor all operations, manage residents, and oversee locker infrastructure.
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm mb-8">
                <div className="glass-card p-4 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-400 font-mono text-2xl mb-1">{lockers.length}</p>
                  <p className="text-gray-500">Total Lockers</p>
                </div>
                <div className="glass-card p-4 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-400 font-mono text-2xl mb-1">{deliveries.length}</p>
                  <p className="text-gray-500">Deliveries Tracked</p>
                </div>
                <div className="glass-card p-4 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-400 font-mono text-2xl mb-1">{residents.length}</p>
                  <p className="text-gray-500">Residents</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-sm text-gray-400">
                  <span className="text-yellow-400 font-semibold">Building: Prism</span> — Premium residential complex with 100 smart lockers and real-time delivery management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
