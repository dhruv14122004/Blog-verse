import React from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-sans selection:bg-[var(--color-neon-red)] selection:text-white relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-zinc-800)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>

      <div className="w-full max-w-md bg-zinc-900 border-2 border-zinc-800 p-1 relative z-10 shadow-[0_0_50px_rgba(255,45,45,0.1)]">

        {/* Comic Border Effect */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-[var(--color-neon-red)] z-20"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[var(--color-electric-blue)] z-20"></div>

        <div className="p-8 border border-zinc-800 h-full bg-zinc-900/90 backdrop-blur-sm">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black border-2 border-[var(--color-neon-red)] text-[var(--color-neon-red)] mb-6 shadow-[4px_4px_0px_#fff]">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase mb-2">ADMIN_ACCESS</h1>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">SECURE_CHANNEL_ESTABLISHED</p>
          </div>

          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono font-bold text-zinc-500 uppercase mb-2">IDENTITY_KEY (EMAIL)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-600 group-focus-within:text-[var(--color-neon-red)] transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="name@inkbyte.com"
                  className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded text-white text-sm font-mono placeholder-zinc-700
                           focus:outline-none focus:border-[var(--color-neon-red)] focus:ring-1 focus:ring-[var(--color-neon-red)]
                           transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono font-bold text-zinc-500 uppercase">ACCESS_CODE</label>
                <a href="#" className="text-xs font-mono text-[var(--color-electric-blue)] hover:text-white transition-colors">
                  RESET_CODE?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-600 group-focus-within:text-[var(--color-neon-red)] transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded text-white text-sm font-mono placeholder-zinc-700
                           focus:outline-none focus:border-[var(--color-neon-red)] focus:ring-1 focus:ring-[var(--color-neon-red)]
                           transition-all duration-200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => navigate("/admin")}
              type="submit"
              className="w-full group flex items-center justify-center bg-[var(--color-neon-red)] text-white py-4 font-black italic uppercase tracking-wider skew-x-[-10deg] hover:bg-red-600 transition-all shadow-[4px_4px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none mt-8"
            >
              <span className="skew-x-[10deg] flex items-center gap-2">
                AUTHENTICATE <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;