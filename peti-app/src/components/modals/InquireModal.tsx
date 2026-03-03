import { useState } from 'react';
import { X, MessageSquare, CheckCircle } from 'lucide-react';

interface InquireModalProps {
  onClose: () => void;
}

export default function InquireModal({ onClose }: InquireModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background: 'rgba(0, 0, 0, 0.85)'}}>
        <div className="hud-modal rounded-2xl p-12 w-full max-w-md relative animate-scale-in text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-space font-bold text-3xl mb-3">Thank You!</h2>
          <p className="text-gray-400">We've received your inquiry and will get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{background: 'rgba(0, 0, 0, 0.85)'}}>
      <div className="hud-modal rounded-2xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-nexa-indigo to-nexa-cyan flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-space font-bold text-2xl mb-2">Inquire About Nexa Crux</h2>
          <p className="text-sm text-gray-500">Tell us about your property and we'll get back to you</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="Your name" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone</label>
              <input type="tel" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="+91..." required />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Property Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="e.g., Oberoi Skyline" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">City</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="Mumbai" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">State</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="Maharashtra" required />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Product Interest</label>
            <div className="relative">
              <select 
                className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm appearance-none cursor-pointer pr-10"
                style={{background: '#1A1A2E', color: '#FFFFFF'}}
                required
              >
                <option value="" style={{background: '#1A1A2E', color: '#FFFFFF'}}>Select a product</option>
                <option value="nexa-hub" style={{background: '#1A1A2E', color: '#FFFFFF'}}>Nexa Hub</option>
                <option value="nexa-hive" style={{background: '#1A1A2E', color: '#FFFFFF'}}>Nexa Hive</option>
                <option value="nexa-stealth" style={{background: '#1A1A2E', color: '#FFFFFF'}}>Nexa [Stealth]</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Number of Lockers Needed</label>
            <input type="number" className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm" placeholder="e.g., 50" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Additional Comments</label>
            <textarea className="w-full px-4 py-3 rounded-xl hud-input text-white font-mono text-sm h-24 resize-none" placeholder="Tell us more about your requirements..."></textarea>
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-nexa-indigo to-nexa-electric font-space font-semibold hover:shadow-lg hover:shadow-nexa-indigo/50 transition-all relative overflow-hidden group">
            <span className="relative z-10">Submit Inquiry</span>
            <div className="absolute inset-0 bg-gradient-to-r from-nexa-cyan to-nexa-indigo opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </form>
      </div>
    </div>
  );
}
