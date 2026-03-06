import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Package, Grid3x3, HelpCircle, AlertCircle, TrendingUp, Search, PenTool } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

type ViewName = 'overview' | 'locker-map' | 'deliveries' | 'residents' | 'tickets';
type TimeFilter = 'day' | 'week' | 'month';

export default function Dashboard() {
  const { logout, deliveries, lockers, residents } = useApp();
  const [activeView, setActiveView] = useState<ViewName>('overview');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');
  const [deliverySearch, setDeliverySearch] = useState('');
  const [residentSearch, setResidentSearch] = useState('');

  const occupiedCount = lockers.filter(l => l.status === 'occupied').length;
  const unoccupiedCount = lockers.filter(l => l.status === 'available').length;
  const issueCount = lockers.filter(l => l.status === 'issue').length;
  const staleCount = deliveries.filter(d => d.status === 'Stale' || d.daysInLocker > 7).length;

  const switchView = (viewName: ViewName) => {
    setActiveView(viewName);
  };

  const getChartData = () => {
    const labels = timeFilter === 'day' 
      ? ['12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM']
      : timeFilter === 'week'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    const data = timeFilter === 'day'
      ? [2, 3, 1, 4, 8, 15, 12, 18, 14, 9, 5, 3]
      : timeFilter === 'week'
      ? [45, 52, 48, 61, 55, 38, 42]
      : [180, 195, 210, 188];

    return {
      labels,
      datasets: [{
        label: 'Packages',
        data,
        borderColor: '#00f2ff',
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00f2ff',
        pointBorderColor: '#00f2ff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00f2ff',
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#00f2ff',
        bodyColor: '#fff',
        borderColor: '#00f2ff',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af', font: { family: 'Space Mono' } }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af', font: { family: 'Space Mono' } }
      }
    }
  };

  return (
    <div className="min-h-screen" style={{background: '#050505'}}>
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-20 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-6 z-50" style={{background: 'rgba(0, 0, 0, 0.6)'}}>
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}assets/nexa-crux-logo.png`} alt="Nexa Crux" className="h-16" />
          <div>
            <h1 className="font-space font-bold text-white text-base">Command Center</h1>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-8">
          <button 
            onClick={() => switchView('overview')}
            className={`text-sm font-medium transition-all ${activeView === 'overview' ? 'text-nexa-cyan border-b-2 border-nexa-cyan pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => switchView('locker-map')}
            className={`text-sm font-medium transition-all ${activeView === 'locker-map' ? 'text-nexa-cyan border-b-2 border-nexa-cyan pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Live Locker Map
          </button>
          <button 
            onClick={() => switchView('deliveries')}
            className={`text-sm font-medium transition-all ${activeView === 'deliveries' ? 'text-nexa-cyan border-b-2 border-nexa-cyan pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Deliveries
          </button>
          <button 
            onClick={() => switchView('residents')}
            className={`text-sm font-medium transition-all ${activeView === 'residents' ? 'text-nexa-cyan border-b-2 border-nexa-cyan pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Residents
          </button>
          <button 
            onClick={() => switchView('tickets')}
            className={`text-sm font-medium transition-all ${activeView === 'tickets' ? 'text-nexa-cyan border-b-2 border-nexa-cyan pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Tickets
          </button>
        </nav>

        {/* Right: Help & Sign Out */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={logout}
            className="px-4 py-2 rounded-lg border border-white/20 text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content - View Switching */}
      <main className="pt-20 min-h-screen px-6 py-6">
        
        {/* OVERVIEW VIEW */}
        {activeView === 'overview' && (
          <div className="animate-fade-in">
            {/* Top Row Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="glass-card rounded-xl p-6 border-l-4 border-l-nexa-cyan" style={{boxShadow: '0 0 30px rgba(0, 242, 255, 0.2)'}}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-xs mb-1 font-mono">ACTIVE LOCKERS</p>
                    <h3 className="text-4xl font-bold text-white font-mono">{occupiedCount}</h3>
                    <div className="flex items-center gap-1 mt-2 text-nexa-cyan text-xs font-mono">
                      <TrendingUp className="w-3 h-3" />
                      <span>Currently in use</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{background: 'rgba(0, 242, 255, 0.2)'}}>
                    <Grid3x3 className="w-6 h-6 text-nexa-cyan" />
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6 border-l-4 border-l-green-500" style={{boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)'}}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-xs mb-1 font-mono">UNOCCUPIED</p>
                    <h3 className="text-4xl font-bold text-white font-mono">{unoccupiedCount}</h3>
                    <div className="flex items-center gap-1 mt-2 text-green-400 text-xs font-mono">
                      <span>Ready for delivery</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{background: 'rgba(34, 197, 94, 0.2)'}}>
                    <Package className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6 border-l-4 border-l-red-500 animate-pulse-slow" style={{boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)'}}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-xs mb-1 font-mono">SYSTEM ISSUES</p>
                    <h3 className="text-4xl font-bold text-white font-mono">{issueCount + staleCount}</h3>
                    <div className="flex items-center gap-1 mt-2 text-red-400 text-xs font-mono">
                      <AlertCircle className="w-3 h-3" />
                      <span>Requires attention</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{background: 'rgba(239, 68, 68, 0.2)'}}>
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Analytics Graph */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-space font-bold text-xl text-white mb-1">Delivery Analytics</h3>
                  <p className="text-gray-400 text-sm font-mono">Package arrival patterns</p>
                </div>
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-mono cursor-pointer appearance-none pr-10"
                  style={{background: '#1A1A2E'}}
                >
                  <option value="day">This Day</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <div className="h-64">
                <Line data={getChartData()} options={chartOptions} />
              </div>
            </div>
          </div>
        )}

        {/* LIVE LOCKER MAP VIEW */}
        {activeView === 'locker-map' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-space font-bold text-2xl text-white mb-2">Live Locker Map</h2>
              <p className="text-gray-400 text-sm font-mono">Real-time status of all 100 lockers</p>
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{background: '#22c55e'}}></div>
                <span className="text-sm text-gray-400 font-mono">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{background: '#8b5cf6'}}></div>
                <span className="text-sm text-gray-400 font-mono">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{background: '#ef4444'}}></div>
                <span className="text-sm text-gray-400 font-mono">Issue</span>
              </div>
            </div>

            {/* Locker Bank View */}
            <div className="glass-card rounded-xl p-6 space-y-8">
              {/* Large Lockers (L-85 to L-100) */}
              <div>
                <h3 className="text-gray-400 text-xs font-mono uppercase mb-4">LARGE LOCKERS (L-85 TO L-100)</h3>
                <div className="grid grid-cols-8 gap-3">
                  {lockers.filter(l => l.size === 'large').map((locker) => {
                    const delivery = deliveries.find(d => d.lockerId === locker.label);
                    const isStale = delivery && delivery.daysInLocker > 7;
                    const bgColor = isStale ? '#ef4444' : locker.status === 'available' ? '#22c55e' : locker.status === 'occupied' ? '#8b5cf6' : '#ef4444';
                    
                    return (
                      <div
                        key={locker.id}
                        className="h-16 rounded-lg flex items-center justify-center border border-white/10 transition-all hover:scale-105 cursor-pointer"
                        style={{background: bgColor}}
                        title={`${locker.label} - ${isStale ? 'Stale' : locker.status}`}
                      >
                        <span className="text-sm font-mono font-bold text-white">{locker.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Medium Lockers (M-51 to M-84) */}
              <div>
                <h3 className="text-gray-400 text-xs font-mono uppercase mb-4">MEDIUM LOCKERS (M-51 TO M-84)</h3>
                <div className="grid grid-cols-12 gap-2">
                  {lockers.filter(l => l.size === 'medium').map((locker) => {
                    const delivery = deliveries.find(d => d.lockerId === locker.label);
                    const isStale = delivery && delivery.daysInLocker > 7;
                    const bgColor = isStale ? '#ef4444' : locker.status === 'available' ? '#22c55e' : locker.status === 'occupied' ? '#8b5cf6' : '#ef4444';
                    
                    return (
                      <div
                        key={locker.id}
                        className="h-12 rounded-lg flex items-center justify-center border border-white/10 transition-all hover:scale-105 cursor-pointer"
                        style={{background: bgColor}}
                        title={`${locker.label} - ${isStale ? 'Stale' : locker.status}`}
                      >
                        <span className="text-xs font-mono font-bold text-white">{locker.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Small Lockers (S-01 to S-50) */}
              <div>
                <h3 className="text-gray-400 text-xs font-mono uppercase mb-4">SMALL LOCKERS (S-01 TO S-50)</h3>
                <div className="grid grid-cols-10 gap-2">
                  {lockers.filter(l => l.size === 'small').map((locker) => {
                    const delivery = deliveries.find(d => d.lockerId === locker.label);
                    const isStale = delivery && delivery.daysInLocker > 7;
                    const bgColor = isStale ? '#ef4444' : locker.status === 'available' ? '#22c55e' : locker.status === 'occupied' ? '#8b5cf6' : '#ef4444';
                    
                    return (
                      <div
                        key={locker.id}
                        className="h-10 rounded-lg flex items-center justify-center border border-white/10 transition-all hover:scale-105 cursor-pointer"
                        style={{background: bgColor}}
                        title={`${locker.label} - ${isStale ? 'Stale' : locker.status}`}
                      >
                        <span className="text-xs font-mono font-bold text-white">{locker.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DELIVERIES VIEW */}
        {activeView === 'deliveries' && (
          <div className="animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-space font-bold text-2xl text-white mb-2">Delivery Management</h2>
                <p className="text-gray-400 text-sm font-mono">Track package lifecycle</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search deliveries..."
                  value={deliverySearch}
                  onChange={(e) => setDeliverySearch(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-nexa-surface/30 text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-nexa-cyan transition-colors"
                />
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10" style={{background: 'rgba(26, 26, 46, 0.5)'}}>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Delivery Time</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Resident</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Unit</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Locker</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Carrier</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Confirmation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries
                      .filter(d => 
                        deliverySearch === '' || 
                        d.recipient.toLowerCase().includes(deliverySearch.toLowerCase()) ||
                        d.carrier.toLowerCase().includes(deliverySearch.toLowerCase()) ||
                        d.unit.includes(deliverySearch) ||
                        d.lockerId.toLowerCase().includes(deliverySearch.toLowerCase())
                      )
                      .map((delivery) => {
                        const [time, date] = delivery.timestamp.split(', ');
                        const pickupParts = delivery.pickupTime ? delivery.pickupTime.split(', ') : null;
                        
                        return (
                          <tr key={delivery.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6">
                              <div className="text-white text-sm font-mono">{time || delivery.timestamp}</div>
                              <div className="text-gray-500 text-xs font-mono mt-0.5">{date || ''}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-nexa-cyan text-sm font-mono font-medium">{delivery.recipient}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-white text-sm font-mono">{delivery.unit}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-white text-sm font-mono">{delivery.lockerId}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-gray-300 text-sm font-mono">{delivery.carrier}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                                  delivery.status === 'Picked Up' ? 'bg-green-500/20 text-green-400' :
                                  delivery.status === 'Stale' ? 'bg-red-500/20 text-red-400' :
                                  'bg-nexa-cyan/20 text-nexa-cyan'
                                }`}>
                                  {delivery.status}
                                </span>
                                {delivery.status === 'Picked Up' && delivery.pickupTime && (
                                  <div className="text-gray-500 text-xs font-mono mt-1">
                                    {pickupParts ? `${pickupParts[0]}, ${pickupParts[1]}` : delivery.pickupTime}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              {delivery.status === 'Picked Up' && delivery.confirmation === 'signature' && (
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-nexa-cyan/20 flex items-center justify-center">
                                    <PenTool className="w-4 h-4 text-nexa-cyan" />
                                  </div>
                                  <span className="text-xs font-mono text-gray-400">Signed</span>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* RESIDENTS VIEW */}
        {activeView === 'residents' && (
          <div className="animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-space font-bold text-2xl text-white mb-2">Residents</h2>
                <p className="text-gray-400 text-sm font-mono">Registered property residents</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search residents..."
                  value={residentSearch}
                  onChange={(e) => setResidentSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-nexa-surface/30 text-white text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-nexa-cyan transition-colors"
                />
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 text-xs font-mono uppercase">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-xs font-mono uppercase">Unit Number</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-xs font-mono uppercase">Contact Number</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-xs font-mono uppercase">Email ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-xs font-mono uppercase">Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {residents
                    .filter(r => 
                      residentSearch === '' ||
                      r.name.toLowerCase().includes(residentSearch.toLowerCase()) ||
                      r.unit.includes(residentSearch) ||
                      r.email.toLowerCase().includes(residentSearch.toLowerCase()) ||
                      r.phone.includes(residentSearch)
                    )
                    .map((resident, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white text-sm font-mono">{resident.name}</td>
                      <td className="py-3 px-4 text-gray-300 text-sm font-mono">{resident.unit}</td>
                      <td className="py-3 px-4 text-gray-300 text-sm font-mono">{resident.phone}</td>
                      <td className="py-3 px-4 text-gray-300 text-sm font-mono">{resident.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-mono ${resident.pending > 0 ? 'bg-nexa-cyan/20 text-nexa-cyan' : 'bg-gray-500/20 text-gray-400'}`}>
                          {resident.pending}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TICKETS VIEW */}
        {activeView === 'tickets' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="font-space font-bold text-2xl text-white mb-2">Maintenance Tickets</h2>
              <p className="text-gray-400 text-sm font-mono">Raise and track system issues</p>
            </div>
            
            <div className="glass-card rounded-xl p-12 text-center">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-nexa-indigo to-nexa-cyan flex items-center justify-center mx-auto mb-6 opacity-50">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-space font-bold text-xl text-white mb-2">Tickets Module</h3>
              <p className="text-gray-400 font-mono text-sm">This feature is coming soon. You'll be able to raise maintenance requests for locker issues.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
