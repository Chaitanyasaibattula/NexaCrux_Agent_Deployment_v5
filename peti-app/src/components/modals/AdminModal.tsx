import { useState } from 'react';
import { X, Shield, ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface AdminModalProps {
  onClose: () => void;
}

export default function AdminModal({ onClose }: AdminModalProps) {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === 'admin@gmail.com' && accessCode === '1234') {
        login(email, accessCode, 'admin');
        onClose();
      } else {
        alert('Invalid credentials. Use admin@gmail.com / 1234 for demo.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background: 'rgba(0, 0, 0, 0.95)'}}>
      <div className="hud-modal rounded-2xl p-8 w-full max-w-md relative border-yellow-500/60 animate-scale-in" style={{boxShadow: '0 0 80px rgba(251, 191, 36, 0.3)'}}>
        <div className="absolute inset-0 rounded-2xl opacity-20" style={{background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.2)'}}></div>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-10">
          <X className="w-4 h-4 text-gray-400" />
        </button>
        <div className="relative text-center mb-8">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-3">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <span className="text-xs font-mono text-yellow-400 uppercase">Maximum Security Required</span>
          </div>
          <h2 className="font-space font-bold text-2xl mb-2">System Admin Portal</h2>
          <p className="text-sm text-gray-500">Full system access - authorized personnel only</p>
        </div>
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Admin Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" 
              placeholder="admin@example.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Access Code</label>
            <input 
              type="password" 
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" 
              placeholder="••••••••"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 font-space font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-yellow-500/30 transition-all disabled:opacity-50 text-black"
          >
            <span>{loading ? 'Authenticating...' : 'Access Admin Dashboard'}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
