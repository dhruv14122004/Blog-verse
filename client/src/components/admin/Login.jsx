import React, { use } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  return (
    // 1. Background: Changed to a subtle gradient for depth, rather than flat white
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
      
      {/* 2. Card: Increased shadow, subtle border, and better padding */}
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
        
        <div className="p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Optional: Placeholder for Logo */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              <img src={assets.favicon} alt="" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-2">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                           transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                           transition-all duration-200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={()=>navigate("/admin")}
              type="submit"
              className="w-full flex items-center justify-center bg-primary text-white py-2.5 rounded-xl font-medium shadow-lg shadow-primary/30 
                       hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 
                       active:scale-[0.98] transition-all duration-200"
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login (Google Placeholder) */}
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
                className="h-5 w-5 mr-2" 
              />
              Sign in with Google
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;