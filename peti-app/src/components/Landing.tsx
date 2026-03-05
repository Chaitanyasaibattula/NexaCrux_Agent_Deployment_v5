import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Key, Palette, Smartphone, Building2, Briefcase, GraduationCap, HeartPulse, Twitter, Instagram, Linkedin, Waves, Cpu, X, Hexagon, Lock } from 'lucide-react';
import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal';
import ManagerModal from './modals/ManagerModal';
import InquireModal from './modals/InquireModal';
import AdminModal from './modals/AdminModal';

export default function Landing() {
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | 'manager' | 'inquire' | 'admin' | null>(null);

  // Terminal simulation with continuous auto-scrolling logs
  useEffect(() => {
    const terminalFeed = document.getElementById('terminalFeed');
    if (!terminalFeed) return;

    const logTemplates = [
      { text: '[SECURE] Locker M-{n} verified', color: 'text-[#00FF41]' },
      { text: '[SYNC] Cloud database updated', color: 'text-[#00f2ff]' },
      { text: '[AUTH] Admin session active', color: 'text-[#FF3131]' },
      { text: '[TEMP] Hardware nominal: {t}°C', color: 'text-gray-400' },
      { text: '[DELIVERY] Package received in S-{n}', color: 'text-[#00f2ff]' },
      { text: '[ALERT] Locker L-{n} opened', color: 'text-[#00FF41]' },
      { text: '[NETWORK] Uplink stable - 98ms', color: 'text-gray-400' },
      { text: '[SCAN] Barcode validated', color: 'text-[#00FF41]' },
      { text: '[SMS] Notification sent to resident', color: 'text-[#00f2ff]' },
      { text: '[STATUS] System health: Optimal', color: 'text-[#00FF41]' },
    ];

    const generateLog = () => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      let text = template.text;
      text = text.replace('{n}', String(Math.floor(Math.random() * 100) + 1).padStart(2, '0'));
      text = text.replace('{t}', String(Math.floor(Math.random() * 5) + 22));
      return { text, color: template.color };
    };

    // Initial logs
    const initialLogs = [
      { text: '> nexa-core v2.4.1 initializing...', color: 'text-[#00f2ff]' },
      { text: '✓ Locker grid online [100/100]', color: 'text-[#00FF41]' },
      { text: '✓ Carrier API sync active', color: 'text-[#00FF41]' },
    ];

    initialLogs.forEach(log => {
      const line = document.createElement('div');
      line.className = `${log.color} animate-fade-in`;
      line.textContent = log.text;
      terminalFeed.appendChild(line);
    });

    // Continuous log generation
    const interval = setInterval(() => {
      const log = generateLog();
      const line = document.createElement('div');
      line.className = `${log.color} animate-fade-in`;
      line.textContent = log.text;
      terminalFeed.appendChild(line);
      
      // Auto-scroll to bottom
      terminalFeed.scrollTop = terminalFeed.scrollHeight;
      
      // Keep only last 20 logs to prevent memory issues
      while (terminalFeed.children.length > 20) {
        terminalFeed.removeChild(terminalFeed.firstChild!);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-nexa-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/assets/nexa-crux-logo.png" alt="Nexa Crux" className="h-20" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#capabilities" className="text-sm text-gray-400 hover:text-white transition-colors">Capabilities</a>
              <a href="#nexa-series" className="text-sm text-gray-400 hover:text-white transition-colors">Nexa Series</a>
              <a href="#core" className="text-sm text-gray-400 hover:text-white transition-colors">Nexa Crux Core</a>
              <a href="#sectors" className="text-sm text-gray-400 hover:text-white transition-colors">Sectors</a>
              <a href="#sustainability" className="text-sm text-gray-400 hover:text-white transition-colors">Sustainability</a>
              <button onClick={() => setActiveModal('inquire')} className="text-sm text-gray-400 hover:text-white transition-colors">Inquire</button>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveModal('login')}
                className="px-5 py-2.5 rounded-lg border border-white/20 text-sm font-medium hover:border-nexa-indigo/60 hover:bg-nexa-indigo/10 transition-all"
              >
                Login
              </button>
              <button 
                onClick={() => setActiveModal('signup')}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-nexa-indigo to-nexa-electric text-sm font-medium hover:shadow-lg hover:shadow-nexa-indigo/30 transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden" style={{background: 'linear-gradient(135deg, #0a0a14 0%, #0f0f1e 50%, #141428 100%)'}}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large atmospheric blue glow on right side matching screenshot */}
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px]" style={{background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(79, 70, 229, 0.25) 40%, transparent 70%)'}}></div>
          {/* Secondary purple accent on left */}
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 60%)'}}></div>
          {/* Bottom atmospheric glow */}
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] rounded-full blur-[140px]" style={{background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Now Deploying in Premium Properties</span>
              </div>
              
              <h1 className="font-space font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.02em]">
                The New<br/><span className="gradient-text">Architecture</span><br/>of Delivery.
              </h1>
              
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                Intelligent, secure, and seamlessly integrated into your property's infrastructure.
              </p>
            </div>
            
            <div className="relative flex justify-center items-center">
              {/* Concentrated blue glow matching screenshot */}
              <div className="absolute inset-0 rounded-3xl blur-[120px]" style={{background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.4) 0%, rgba(79, 70, 229, 0.3) 30%, transparent 65%)'}}></div>
              <div className="absolute inset-0 rounded-3xl blur-[80px]" style={{background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, transparent 60%)'}}></div>
              
              <div className="relative animate-float">
                {/* Strong blue edge glow around locker */}
                <div className="absolute -inset-6 rounded-3xl blur-2xl" style={{background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.5) 0%, rgba(79, 70, 229, 0.3) 40%, transparent 70%)'}}></div>
                <div className="absolute -inset-3 rounded-2xl blur-xl" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(59, 130, 246, 0.3) 100%)'}}></div>
                
                <div className="relative w-72 h-[480px] rounded-2xl locker-glow overflow-hidden" style={{background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)', border: '1px solid rgba(99, 102, 241, 0.6)', boxShadow: '0 0 80px rgba(59, 130, 246, 0.6), 0 0 120px rgba(79, 70, 229, 0.4), inset 0 0 60px rgba(99, 102, 241, 0.1)'}}>
                  <div className="absolute top-0 left-0 right-0 h-1 led-strip"></div>
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-nexa-indigo/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 led-strip"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-nexa-indigo/20 to-transparent"></div>
                  
                  <div className="p-5 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-space font-bold text-xl gradient-text">Nexa Crux</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-xs font-mono text-gray-500">ONLINE</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <div className="col-span-1 space-y-2">
                        <div className="h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><span className="font-mono text-xs text-gray-600">S-01</span></div>
                        <div className="h-14 rounded-lg bg-nexa-indigo/20 border border-nexa-indigo/50 flex items-center justify-center relative overflow-hidden">
                          <span className="font-mono text-xs text-nexa-cyan">S-02</span>
                          <div className="absolute inset-0 bg-nexa-cyan/10 animate-pulse"></div>
                        </div>
                        <div className="h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><span className="font-mono text-xs text-gray-600">S-03</span></div>
                        <div className="h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><span className="font-mono text-xs text-gray-600">S-04</span></div>
                      </div>
                      <div className="col-span-1 space-y-2">
                        <div className="h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><span className="font-mono text-xs text-gray-600">M-01</span></div>
                        <div className="h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><span className="font-mono text-xs text-gray-600">M-02</span></div>
                        <div className="h-20 rounded-lg bg-nexa-cyan/20 border border-nexa-cyan/50 flex items-center justify-center relative overflow-hidden">
                          <span className="font-mono text-xs text-nexa-cyan">M-03</span>
                          <div className="absolute inset-0 bg-nexa-cyan/10 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="col-span-1 space-y-2">
                        <div className="h-28 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><span className="font-mono text-xs text-gray-600">L-01</span></div>
                        <div className="h-28 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"><span className="font-mono text-xs text-gray-600">L-02</span></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 h-16 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/20 flex items-center justify-center relative overflow-hidden">
                      <div className="scan-line"></div>
                      <span className="font-mono text-sm text-gray-500">Touch to retrieve</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-3 h-3 rounded-full bg-nexa-cyan animate-pulse"></div>
                <div className="absolute top-1/3 -left-5 w-2 h-2 rounded-full bg-nexa-indigo animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 -right-6 w-3 h-3 rounded-full bg-nexa-glow animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carrier Trust Marquee */}
      <section className="relative py-6 border-y border-white/5">
        <div className="overflow-hidden whitespace-nowrap relative">
          <div className="inline-flex items-center gap-20 px-10 animate-marquee-rtl">
            <img src="https://cdn.freebiesupply.com/images/large/2x/amazon-logo-transparent.png" alt="Amazon" className="h-10 w-auto object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Blue_Dart_logo_transparent.png" alt="Blue Dart" className="h-10 w-auto object-contain" />
            <img src="https://companieslogo.com/img/orig/DELHIVERY.NS.D-b508130d.png" alt="Delhivery" className="h-10 w-auto object-contain" />
            <img src="https://cdn.freebiesupply.com/logos/large/2x/flipkart-logo-png-transparent.png" alt="Flipkart" className="h-10 w-auto object-contain" />
            <img src="https://cdn.freebiesupply.com/logos/large/2x/dhl-1-logo-png-transparent.png" alt="DHL" className="h-10 w-auto object-contain" />
            <img src="https://cdn.freebiesupply.com/images/large/2x/amazon-logo-transparent.png" alt="Amazon" className="h-10 w-auto object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Blue_Dart_logo_transparent.png" alt="Blue Dart" className="h-10 w-auto object-contain" />
            <img src="https://companieslogo.com/img/orig/DELHIVERY.NS.D-b508130d.png" alt="Delhivery" className="h-10 w-auto object-contain" />
            <img src="https://cdn.freebiesupply.com/logos/large/2x/flipkart-logo-png-transparent.png" alt="Flipkart" className="h-10 w-auto object-contain" />
            <img src="https://cdn.freebiesupply.com/logos/large/2x/dhl-1-logo-png-transparent.png" alt="DHL" className="h-10 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-nexa-black via-nexa-charcoal to-nexa-black"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-nexa-cyan mb-4 uppercase tracking-widest">Capabilities</p>
            <h2 className="font-space font-bold text-4xl md:text-5xl tracking-[-0.02em]">Built for <span className="gradient-text">Modern Living</span></h2>
          </div>
          
          {/* Nexa Crux Hardware Image */}
          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-nexa-indigo/10 to-nexa-cyan/10 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src="/assets/peti-hardware-100.png" alt="Nexa Crux Intelligent Locker System - 100 Units" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-nexa-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="font-mono text-sm text-gray-300">Nexa Crux Pro Series — 100-Unit Configuration</span>
                </div>
                <div className="flex gap-4 text-xs font-mono text-gray-400">
                  <span>50× Small</span>
                  <span>34× Medium</span>
                  <span>16× Large</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="capability-card glass-card rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-nexa-indigo/20 to-nexa-cyan/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-nexa-indigo" />
              </div>
              <h3 className="font-space font-semibold text-xl mb-3">Secure Custody</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Automated, 24/7 reception for every parcel. Eliminates lobby clutter and ensures zero missed deliveries.</p>
            </div>
            <div className="capability-card glass-card rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-nexa-cyan/20 to-green-500/20 flex items-center justify-center mb-6">
                <Key className="w-7 h-7 text-nexa-cyan" />
              </div>
              <h3 className="font-space font-semibold text-xl mb-3">Instant Keys</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Residents receive a unique digital key (OTP) via SMS or Email the moment their package is secured.</p>
            </div>
            <div className="capability-card glass-card rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-nexa-indigo/20 flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-space font-semibold text-xl mb-3">Bespoke Integration</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Customizable finishes and modular configurations designed to blend seamlessly with your property's architectural aesthetic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nexa Series Section */}
      <section id="nexa-series" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexa-indigo/10 rounded-full blur-[150px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-nexa-cyan mb-4 uppercase tracking-widest">Nexa Series</p>
            <h2 className="font-space font-bold text-4xl md:text-5xl tracking-[-0.02em]">Choose Your <span className="gradient-text">Solution</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Nexa Hub Card */}
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card-strong rounded-2xl p-8 border border-white/10 backdrop-blur-md"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-nexa-indigo to-nexa-cyan flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-space font-bold text-2xl mb-3">Nexa Hub</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The gold standard for residential and corporate package management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-nexa-indigo/20 text-nexa-cyan text-xs font-mono">Residential</span>
                <span className="px-3 py-1 rounded-full bg-nexa-indigo/20 text-nexa-cyan text-xs font-mono">Corporate</span>
              </div>
            </motion.div>

            {/* Nexa Hive Card - Hexagonal */}
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card-strong rounded-2xl p-8 border border-white/10 backdrop-blur-md relative overflow-hidden"
              style={{ transformStyle: "preserve-3d", clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                  <Hexagon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-space font-bold text-2xl mb-3">Nexa Hive</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  A revolutionary hexagonal glass-display locker designed for luxury retail and high-end boutiques.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono">Luxury Retail</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono">Boutiques</span>
                </div>
              </div>
            </motion.div>

            {/* Nexa Stealth Card - Coming Soon */}
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card-strong rounded-2xl p-8 border border-white/10 backdrop-blur-md relative overflow-hidden bg-gradient-to-br from-nexa-black to-nexa-charcoal"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-nexa-electric/20 text-nexa-electric text-xs font-mono border border-nexa-electric/30">Coming Soon</span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-6 border border-white/20">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-space font-bold text-2xl mb-3">Nexa [Stealth]</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Redefining the future of secure logistics.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 text-gray-500 text-xs font-mono">Classified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nexa Crux Core Section */}
      <section id="core" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nexa-indigo/10 rounded-full blur-[150px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-sm text-nexa-cyan mb-4 uppercase tracking-widest">Nexa Crux Core</p>
              <h2 className="font-space font-bold text-4xl md:text-5xl tracking-[-0.02em] mb-6">System <span className="gradient-text">Intelligence</span></h2>
              <p className="text-gray-400 leading-relaxed mb-8">Every Nexa Crux unit is powered by our proprietary Core OS—constantly monitoring, learning, and optimizing delivery flow for your property.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-nexa-surface/50 backdrop-blur-md border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-nexa-cyan/10 flex items-center justify-center">
                    <Waves className="w-6 h-6 text-nexa-cyan" style={{filter: 'drop-shadow(0 0 8px rgba(0, 242, 255, 0.6))'}} />
                  </div>
                  <div>
                    <p className="font-medium">Real-time Monitoring</p>
                    <p className="text-sm text-gray-500">Live status of every compartment</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-nexa-surface/50 backdrop-blur-md border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-nexa-indigo/10 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-nexa-indigo animate-pulse" />
                  </div>
                  <div>
                    <p className="font-medium">Predictive Analytics</p>
                    <p className="text-sm text-gray-500">Anticipate peak delivery times</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-nexa-surface/50 backdrop-blur-md border border-white/10">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">Mobile Integration</p>
                    <p className="text-sm text-gray-500">Native apps for iOS and Android</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card-strong rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-nexa-surface border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '0.6s'}}></div>
                <span className="ml-4 text-xs font-mono text-gray-500">nexa-core — system heartbeat</span>
              </div>
              <div className="p-4 h-80 overflow-hidden font-mono text-xs space-y-1" id="terminalFeed"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-nexa-charcoal via-nexa-black to-nexa-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-sm text-nexa-cyan mb-4 uppercase tracking-widest">Sectors</p>
            <h2 className="font-space font-bold text-4xl md:text-5xl tracking-[-0.02em]">Built for Every <span className="gradient-text">Environment</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="sector-card glass-card rounded-2xl overflow-hidden group cursor-pointer">
              <div className="relative h-64">
                <img src="/assets/sector-residential.png" alt="Luxury Residential" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-nexa-black/95 via-nexa-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="font-space font-semibold text-xl">Luxury Residential</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Premium apartments & gated communities with marble lobbies and gold accents</p>
                </div>
              </div>
            </div>
            
            <div className="sector-card glass-card rounded-2xl overflow-hidden group cursor-pointer">
              <div className="relative h-64">
                <img src="/assets/sector-commercial.png" alt="Commercial Hubs" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-nexa-black/95 via-nexa-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexa-cyan/20 to-blue-500/20 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-nexa-cyan" />
                    </div>
                    <h3 className="font-space font-semibold text-xl">Commercial Hubs</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Office buildings & business parks with glass atriums and steel finishes</p>
                </div>
              </div>
            </div>
            
            <div className="sector-card glass-card rounded-2xl overflow-hidden group cursor-pointer">
              <div className="relative h-64">
                <img src="/assets/sector-education.png" alt="Education" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-nexa-black/95 via-nexa-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-nexa-indigo/20 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="font-space font-semibold text-xl">Education</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Universities & student housing with minimalist white/indigo design</p>
                </div>
              </div>
            </div>
            
            <div className="sector-card glass-card rounded-2xl overflow-hidden group cursor-pointer">
              <div className="relative h-64">
                <img src="/assets/sector-healthcare.png" alt="Healthcare" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-nexa-black/95 via-nexa-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center">
                      <HeartPulse className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="font-space font-semibold text-xl">Healthcare</h3>
                  </div>
                  <p className="text-gray-400 text-sm">Hospitals & medical centers with sterile, clean environments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-nexa-charcoal via-nexa-black to-nexa-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-green-400 mb-4 uppercase tracking-widest">Sustainability</p>
            <h2 className="font-space font-bold text-4xl md:text-5xl tracking-[-0.02em]">The Last-Mile <span className="gradient-text">Impact</span></h2>
          </div>
          
          <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src="/assets/sustainability-traffic.jpg" alt="60% Reduction in Courier Traffic" className="w-full h-auto object-cover" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="font-space font-bold text-4xl gradient-text mb-2">60%</p>
              <p className="text-sm text-gray-400">Reduction in courier traffic</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="font-space font-bold text-4xl text-green-400 mb-2">40%</p>
              <p className="text-sm text-gray-400">Lower carbon footprint</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="font-space font-bold text-4xl text-nexa-cyan mb-2">100%</p>
              <p className="text-sm text-gray-400">Recyclable materials</p>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="font-space font-bold text-4xl text-purple-400 mb-2">Zero</p>
              <p className="text-sm text-gray-400">Failed delivery attempts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexa-indigo to-nexa-cyan flex items-center justify-center">
                  <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-space font-semibold text-xl">Nexa Crux</span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm mb-6">The new architecture of delivery. Intelligent, secure, and seamlessly integrated into your property's infrastructure.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Twitter className="w-4 h-4 text-gray-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Instagram className="w-4 h-4 text-gray-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Linkedin className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>
            <div>
              <p className="font-medium mb-4">Product</p>
              <ul className="space-y-2">
                <li><a href="#capabilities" className="text-sm text-gray-500 hover:text-white transition-colors">Capabilities</a></li>
                <li><a href="#core" className="text-sm text-gray-500 hover:text-white transition-colors">Nexa Crux Core</a></li>
                <li><a href="#sectors" className="text-sm text-gray-500 hover:text-white transition-colors">Sectors</a></li>
                <li><a href="#sustainability" className="text-sm text-gray-500 hover:text-white transition-colors">Sustainability</a></li>
                <li><button onClick={() => setActiveModal('inquire')} className="text-sm text-gray-500 hover:text-white transition-colors">Inquire</button></li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-4">Company</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">© 2026 Nexa Crux Systems. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeModal === 'login' && (
        <LoginModal 
          onClose={() => setActiveModal(null)} 
          onSwitchToManager={() => setActiveModal('manager')}
          onSwitchToSignup={() => setActiveModal('signup')}
          onSwitchToAdmin={() => setActiveModal('admin')}
        />
      )}
      {activeModal === 'signup' && (
        <SignupModal 
          onClose={() => setActiveModal(null)}
          onSwitchToLogin={() => setActiveModal('login')}
        />
      )}
      {activeModal === 'manager' && <ManagerModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'inquire' && <InquireModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'admin' && <AdminModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}
