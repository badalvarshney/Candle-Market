import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound } from 'lucide-react';
import { adminLoginAPI } from '../../services/api';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('admin@illumination.com');
  const [password, setPassword] = useState('adminpassword123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await adminLoginAPI(email, password);
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data));
        onLoginSuccess(data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#122822] border-2 border-[#B45309]/60 p-6 sm:p-8 shadow-2xl text-white">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#1B3B32] border border-[#B45309] mx-auto flex items-center justify-center mb-3">
            <Lock className="w-7 h-7 text-[#FEF3C7]" />
          </div>
          <span className="text-[10px] text-[#B45309] font-bold uppercase tracking-widest block">
            ILLUMINATION BY GARGI
          </span>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-white">
            ADMIN PORTAL ACCESS
          </h2>
          <p className="text-xs text-stone-300 font-light mt-1 uppercase tracking-wider">
            Sign in to manage catalog, orders & limited drops
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/60 p-3 text-red-200 text-xs mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#FEF3C7] uppercase tracking-wider block mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1B3B32] border border-[#B45309]/50 p-3 text-white focus:border-[#B45309] focus:outline-none tracking-wider"
              placeholder="admin@illumination.com"
            />
          </div>

          <div>
            <label className="font-bold text-[#FEF3C7] uppercase tracking-wider block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1B3B32] border border-[#B45309]/50 p-3 text-white focus:border-[#B45309] focus:outline-none tracking-wider"
              placeholder="••••••••"
            />
          </div>

          <div className="bg-[#1B3B32]/80 p-3 border border-[#B45309]/30 text-[11px] text-stone-300 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#B45309] shrink-0" />
            <span>Default Demo Credentials pre-filled for easy testing.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold justify-center py-3 text-xs shadow-lg mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'ENTER ADMIN DASHBOARD'}
          </button>
        </form>

      </div>
    </div>
  );
}
