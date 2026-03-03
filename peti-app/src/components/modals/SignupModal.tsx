import { X, UserPlus } from 'lucide-react';

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export default function SignupModal({ onClose, onSwitchToLogin }: SignupModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account created successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background: 'rgba(0, 0, 0, 0.85)'}}>
      <div className="hud-modal rounded-2xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-nexa-indigo to-nexa-cyan flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-space font-bold text-2xl mb-2">Create Account</h2>
          <p className="text-sm text-gray-500">Join the future of property delivery</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Property Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="e.g., Oberoi Skyline" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Unit Number</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="e.g., 1204" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="Your full name" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-nexa-indigo to-nexa-electric font-space font-semibold hover:shadow-lg hover:shadow-nexa-indigo/30 transition-all">
            Create Account
          </button>
        </form>
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-gray-500">
            Already have an account? <button onClick={onSwitchToLogin} className="font-semibold hover:underline transition-all" style={{color: '#00f2ff'}}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
}
