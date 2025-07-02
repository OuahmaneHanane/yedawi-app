import React from 'react';

const AuthImagePanel = ({ isLogin }) => (
  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
    {/* Logo */}
    <div className="relative z-10 mb-6 flex items-center justify-center">
      <img src="/hand-heart.svg" alt="a hand holding a heart logo" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
    </div>

    {/* Text Content */}
    <div className="relative z-10 max-w-md space-y-4">
      <h3 className="text-2xl font-bold text-white">
        {isLogin ? 'Welcome to Yedawi!' : 'Join Our Mission!'}
      </h3>
      <p className="text-white/80 leading-relaxed text-sm md:text-base">
        {isLogin
          ? 'Sign in to be part of our community and help make a difference.'
          : 'Register now to join our community and start connecting, sharing, and supporting each other. Together, we can make a difference.'}
      </p>
    </div>

    {/* Decorative elements */}
    <div className="absolute top-1/4 -left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
    <div className="absolute bottom-1/3 -right-2 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-1000" />
    <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-500" />

    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-emerald-200 to-green-400 opacity-90" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
  </div>
);

export default AuthImagePanel;
