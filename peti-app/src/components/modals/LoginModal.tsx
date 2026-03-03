import { useState } from 'react';
import { X, LogIn } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToManager: () => void;
  onSwitchToSignup?: () => void;
  onSwitchToAdmin?: () => void;
}

export default function LoginModal({ onClose, onSwitchToManager, onSwitchToSignup, onSwitchToAdmin }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Resident login functionality coming soon!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background: 'rgba(0, 0, 0, 0.85)'}}>
      <div className="hud-modal rounded-2xl p-8 w-full max-w-md relative animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-nexa-indigo to-nexa-cyan flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-space font-bold text-2xl mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-500">Sign in to access your Nexa Crux account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" 
              placeholder="you@example.com" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-nexa-indigo to-nexa-electric font-space font-semibold hover:shadow-lg hover:shadow-nexa-indigo/30 transition-all">
            Sign In
          </button>
        </form>
        <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-center">
          <p className="text-sm text-gray-500">
            Property Manager? <button onClick={onSwitchToManager} className="font-medium hover:underline transition-all" style={{color: '#6366f1'}}>Manager Portal</button>
          </p>
          <p className="text-sm text-gray-500">
            System Admin? <button onClick={onSwitchToAdmin} className="font-bold hover:underline transition-all" style={{color: '#fbbf24'}}>Admin Portal</button>
          </p>
          <p className="text-sm text-gray-500">
            Don't have an account? <button onClick={onSwitchToSignup} className="font-semibold hover:underline transition-all" style={{color: '#00f2ff'}}>Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
