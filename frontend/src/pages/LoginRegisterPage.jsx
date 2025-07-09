import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AuthImagePanel from '../components/AuthImagePanel';
import { getStoredUser } from '../utils/auth'; // your helper

const LoginRegisterPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  // ?redirect=/donate
  const redirectTo = new URLSearchParams(search).get('redirect');
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  /** ✅ Updated: Decides where the user should finally land. */
  const smartRedirect = (user) => {
    // 1️⃣ honour a redirect query *unless* it's missing or just "/dashboard"
    if (redirectTo && redirectTo !== '/dashboard') {
      navigate(redirectTo, { replace: true });
      return;
    }

    // 2️⃣ otherwise role‑based dashboards
    if (user?.role === 'admin') {
      navigate('/dashboardAdmin', { replace: true }); // ✅ Updated path
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  // 👉 If the visitor is already logged‑in, skip the form entirely.
  useEffect(() => {
    const existingUser = getStoredUser();
    if (existingUser) smartRedirect(existingUser);
  }, [redirectTo]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => setIsAnimating(false), 400); // Animation duration
    }, 150);
  };

  /** Fired by <AuthForm> after successful login/register */
  const handleSuccess = (userFromApi) => {
    if (!userFromApi) return;
    smartRedirect(userFromApi);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 ">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row w-full max-w-6xl min-h-[650px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Form Panel */}
          <div
            className={`
              flex-1 flex items-center justify-center p-8 ${isLogin ? 'py-8' : 'py-10'}
              relative z-20 bg-white
              transition-transform duration-500 ease-in-out
              ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
              ${isLogin ? 'order-1' : 'order-2'}
            `}
          >
            <AuthForm
              isLogin={isLogin}
              onToggle={handleToggle}
              isAnimating={isAnimating}
              showToggle={true}
              onSuccess={handleSuccess}
            />
          </div>

          {/* Image Panel */}
          <div
            className={`
              w-full md:w-1/2 relative overflow-hidden
              transition-transform duration-500 ease-in-out
              ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
              ${isLogin ? 'order-2' : 'order-1'}
            `}
          >
            <AuthImagePanel isLogin={isLogin} />
          </div>

          {/* Animated Separator */}
          <div
            className={`
              absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent
              transition-all duration-500 ease-in-out z-30 hidden md:block
            `}
            style={{ left: '50%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
