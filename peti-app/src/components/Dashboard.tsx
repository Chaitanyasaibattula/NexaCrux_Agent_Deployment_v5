import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Package, Grid3x3, HelpCircle, AlertCircle, TrendingUp, Search, PenTool, X, Box, Calendar, User, Hash, Plus, ChevronDown, UserCircle, Settings, Activity, LogOut } from 'lucide-react';
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
  const { logout, deliveries, lockers, residents, tickets, addTicket, updateTicketStatus } = useApp();
  const [activeView, setActiveView] = useState<ViewName>('overview');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');
  const [deliverySearch, setDeliverySearch] = useState('');
  const [residentSearch, setResidentSearch] = useState('');
  const [selectedLocker, setSelectedLocker] = useState<number | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    lockerId: '',
    category: 'Hardware Jam' as 'Hardware Jam' | 'Touchscreen Unresponsive' | 'Sensor Error' | 'Power Issue' | 'Other',
    priority: 'Medium' as 'Low' | 'Medium' | 'High' | 'Emergency',
    description: ''
  });

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
          <img src={`${import.meta.env.BASE_URL}assets/nexa-crux-logo.png?v=${Date.now()}`} alt="Nexa Crux" className="h-16" />
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

        {/* Right: Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <UserCircle className="w-5 h-5 text-nexa-cyan" style={{filter: 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.5))'}} />
            <span className="font-space font-bold text-sm text-white">Oberoi Skyline</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
              showProfileDropdown ? 'rotate-180' : ''
            }`} />
          </button>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <>
              {/* Backdrop to close dropdown */}
              <div 
                className="fixed inset-0 z-30"
                onClick={() => setShowProfileDropdown(false)}
              />
              
              {/* Dropdown Panel */}
              <div className="absolute right-0 top-full mt-2 w-72 bg-nexa-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden animate-slide-down">
                {/* Header Section */}
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs font-mono uppercase text-gray-500 mb-1">Manager Account</p>
                  <p className="text-sm font-mono text-gray-300">manager@oberoi.com</p>
                </div>

                {/* Menu Options */}
                <div className="py-2">
                  <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/5 transition-colors text-left">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-mono text-white">Settings</span>
                  </button>
                  <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/5 transition-colors text-left">
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-mono text-white">Help & Support</span>
                  </button>
                  <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/5 transition-colors text-left">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-mono text-white">System Status</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="border-b border-white/5" />

                {/* Sign Out */}
                <div className="py-2">
                  <button 
                    onClick={() => {
                      setShowProfileDropdown(false);
                      logout();
                    }}
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-mono text-red-400 font-semibold">Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
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
            <div className="glass-card rounded-xl p-6 space-y-8 relative">
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
                        onClick={() => setSelectedLocker(locker.id)}
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
                        onClick={() => setSelectedLocker(locker.id)}
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
                        onClick={() => setSelectedLocker(locker.id)}
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

            {/* Sidebar Overlay */}
            {selectedLocker !== null && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={() => setSelectedLocker(null)}
                />
                
                {/* Sidebar Panel */}
                <div className="fixed top-0 right-0 h-full w-96 bg-nexa-surface/90 backdrop-blur-xl border-l-4 border-nexa-cyan shadow-2xl z-50 animate-slide-in-right overflow-y-auto">
                  {(() => {
                    const locker = lockers.find(l => l.id === selectedLocker);
                    if (!locker) return null;
                    
                    const delivery = deliveries.find(d => d.lockerId === locker.label);
                    const isStale = delivery && delivery.daysInLocker > 7;
                    const displayStatus = isStale ? 'Issue' : locker.status;
                    
                    return (
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h2 className="font-space font-bold text-2xl text-white mb-2">{locker.label}</h2>
                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-medium ${
                              displayStatus === 'available' ? 'bg-green-500/20 text-green-400' :
                              displayStatus === 'occupied' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {displayStatus.toUpperCase()}
                            </span>
                          </div>
                          <button 
                            onClick={() => setSelectedLocker(null)}
                            className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>

                        {/* Locker Info */}
                        <div className="space-y-4 mb-6">
                          <div className="glass-card rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-lg bg-nexa-cyan/20 flex items-center justify-center">
                                <Box className="w-5 h-5 text-nexa-cyan" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-400 font-mono uppercase">Locker Size</p>
                                <p className="text-white font-mono font-semibold capitalize">{locker.size}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Active Delivery Section */}
                        {locker.status === 'occupied' && delivery && (
                          <div className="space-y-4">
                            <div className="border-t border-white/10 pt-4">
                              <h3 className="text-gray-400 text-xs font-mono uppercase mb-4">Active Delivery</h3>
                              
                              <div className="space-y-3">
                                {/* Resident */}
                                <div className="glass-card rounded-lg p-4 border border-white/10">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-nexa-cyan/20 flex items-center justify-center">
                                      <User className="w-5 h-5 text-nexa-cyan" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-xs text-gray-400 font-mono">Resident</p>
                                      <p className="text-nexa-cyan font-mono font-semibold">{delivery.recipient}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Unit */}
                                <div className="glass-card rounded-lg p-4 border border-white/10">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                      <Hash className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-xs text-gray-400 font-mono">Unit Number</p>
                                      <p className="text-white font-mono font-semibold">{delivery.unit}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Carrier */}
                                <div className="glass-card rounded-lg p-4 border border-white/10">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                      <Package className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-xs text-gray-400 font-mono">Carrier</p>
                                      <p className="text-white font-mono font-semibold">{delivery.carrier}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Delivery Time */}
                                <div className="glass-card rounded-lg p-4 border border-white/10">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                      <Calendar className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-xs text-gray-400 font-mono">Delivered At</p>
                                      <p className="text-white font-mono font-semibold">{delivery.timestamp}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Days in Locker Warning */}
                                {delivery.daysInLocker > 5 && (
                                  <div className="glass-card rounded-lg p-4 border border-red-500/30 bg-red-500/10">
                                    <div className="flex items-center gap-3">
                                      <AlertCircle className="w-5 h-5 text-red-400" />
                                      <div className="flex-1">
                                        <p className="text-red-400 font-mono text-sm font-semibold">
                                          {delivery.daysInLocker} days in locker
                                        </p>
                                        <p className="text-red-400/70 font-mono text-xs mt-1">
                                          {delivery.daysInLocker > 7 ? 'Stale delivery - requires attention' : 'Approaching stale threshold'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Available Status Message */}
                        {locker.status === 'available' && (
                          <div className="border-t border-white/10 pt-4">
                            <div className="glass-card rounded-lg p-6 text-center border border-white/10">
                              <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-green-400" />
                              </div>
                              <p className="text-gray-400 font-mono text-sm">This locker is currently empty and ready for new deliveries.</p>
                            </div>
                          </div>
                        )}

                        {/* Issue Status Message */}
                        {locker.status === 'issue' && (
                          <div className="border-t border-white/10 pt-4">
                            <div className="glass-card rounded-lg p-6 text-center border border-red-500/30 bg-red-500/10">
                              <div className="w-16 h-16 rounded-xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-red-400" />
                              </div>
                              <p className="text-red-400 font-mono text-sm font-semibold mb-2">System Issue Detected</p>
                              <p className="text-red-400/70 font-mono text-xs">This locker requires maintenance attention.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </>
            )}
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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-space font-bold text-2xl text-white mb-2">Maintenance Tickets</h2>
                <p className="text-gray-400 text-sm font-mono">Raise and track system issues</p>
              </div>
              <button
                onClick={() => setShowTicketModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-nexa-cyan text-nexa-black font-mono font-semibold text-sm hover:bg-nexa-cyan/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Raise New Ticket
              </button>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10" style={{background: 'rgba(26, 26, 46, 0.5)'}}>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Ticket ID</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Date Created</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Subject</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Priority</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Assigned To</th>
                      <th className="text-left py-4 px-6 text-gray-400 text-xs font-mono uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="text-nexa-cyan text-sm font-mono font-semibold">#{ticket.id}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-white text-sm font-mono">{ticket.createdAt}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-white text-sm font-mono font-medium">{ticket.category} - {ticket.lockerId}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-sm font-mono font-semibold ${
                            ticket.priority === 'Emergency' ? 'text-red-400' :
                            ticket.priority === 'High' ? 'text-orange-400' :
                            ticket.priority === 'Medium' ? 'text-yellow-400' :
                            'text-gray-400'
                          }`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium ${
                            ticket.status === 'Open' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                            ticket.status === 'In Progress' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-300 text-sm font-mono">{ticket.assignedTo}</div>
                        </td>
                        <td className="py-4 px-6">
                          {ticket.status !== 'Resolved' && (
                            <select
                              value={ticket.status}
                              onChange={(e) => updateTicketStatus(ticket.id, e.target.value as 'Open' | 'In Progress' | 'Resolved')}
                              className="px-3 py-1.5 rounded-lg border border-white/20 bg-nexa-surface/50 text-white text-xs font-mono cursor-pointer hover:border-nexa-cyan transition-colors"
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ticket Creation Modal */}
            {showTicketModal && (
              <>
                <div 
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                  onClick={() => setShowTicketModal(false)}
                />
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-nexa-surface/90 backdrop-blur-xl border border-nexa-cyan/30 rounded-xl shadow-2xl z-50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-space font-bold text-xl text-white">Raise New Ticket</h3>
                    <button
                      onClick={() => setShowTicketModal(false)}
                      className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Locker ID Dropdown */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-2">Locker ID</label>
                      <div className="relative">
                        <select
                          value={ticketForm.lockerId}
                          onChange={(e) => setTicketForm({...ticketForm, lockerId: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-nexa-surface/50 text-white font-mono text-sm appearance-none cursor-pointer focus:outline-none focus:border-nexa-cyan transition-colors"
                        >
                          <option value="">Select a locker...</option>
                          {lockers.map(locker => (
                            <option key={locker.id} value={locker.label}>
                              {locker.label} ({locker.size})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Issue Category */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-2">Issue Category</label>
                      <div className="relative">
                        <select
                          value={ticketForm.category}
                          onChange={(e) => setTicketForm({...ticketForm, category: e.target.value as any})}
                          className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-nexa-surface/50 text-white font-mono text-sm appearance-none cursor-pointer focus:outline-none focus:border-nexa-cyan transition-colors"
                        >
                          <option value="Hardware Jam">Hardware Jam</option>
                          <option value="Touchscreen Unresponsive">Touchscreen Unresponsive</option>
                          <option value="Sensor Error">Sensor Error</option>
                          <option value="Power Issue">Power Issue</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Priority Level */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-2">Priority Level</label>
                      <div className="grid grid-cols-4 gap-2">
                        {(['Low', 'Medium', 'High', 'Emergency'] as const).map(priority => (
                          <button
                            key={priority}
                            onClick={() => setTicketForm({...ticketForm, priority})}
                            className={`px-3 py-2 rounded-lg border text-xs font-mono font-semibold transition-all ${
                              ticketForm.priority === priority
                                ? priority === 'Emergency' ? 'border-red-400 bg-red-500/20 text-red-400' :
                                  priority === 'High' ? 'border-orange-400 bg-orange-500/20 text-orange-400' :
                                  priority === 'Medium' ? 'border-yellow-400 bg-yellow-500/20 text-yellow-400' :
                                  'border-gray-400 bg-gray-500/20 text-gray-400'
                                : 'border-white/20 text-gray-400 hover:border-white/40'
                            }`}
                          >
                            {priority}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-mono text-gray-400 mb-2">Description</label>
                      <textarea
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        rows={4}
                        placeholder="Describe the issue in detail..."
                        className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-nexa-surface/50 text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-nexa-cyan transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={() => {
                        if (ticketForm.lockerId && ticketForm.description) {
                          const newTicket = {
                            id: `NC-${8825 + tickets.length}`,
                            lockerId: ticketForm.lockerId,
                            category: ticketForm.category,
                            priority: ticketForm.priority,
                            status: 'Open' as const,
                            description: ticketForm.description,
                            createdAt: new Date().toLocaleString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit', 
                              minute: '2-digit' 
                            }),
                            assignedTo: `Nexa Support Tech #${Math.floor(Math.random() * 5) + 1}`
                          };
                          addTicket(newTicket);
                          setShowTicketModal(false);
                          setTicketForm({
                            lockerId: '',
                            category: 'Hardware Jam',
                            priority: 'Medium',
                            description: ''
                          });
                        }
                      }}
                      disabled={!ticketForm.lockerId || !ticketForm.description}
                      className="w-full px-4 py-3 rounded-lg bg-nexa-cyan text-nexa-black font-mono font-semibold text-sm hover:bg-nexa-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Ticket
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
