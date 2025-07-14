import React, { useState } from 'react';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import ToggleButton from './ToggleButton';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const AuthForm = ({ isLogin, onToggle, isAnimating, showToggle = true, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (isLogin) {
      //  LOGIN
      const res = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (onSuccess) onSuccess(user);
    } else {
      //  REGISTER
      if (formData.password.length < 6) {
        setLoading(false);
        return alert('Password must be at least 6 characters long');
      }
      if (formData.password !== formData.confirmPassword) {
        setLoading(false);
        return alert('Passwords do not match');
      }

      console.log("Registering with:", {
  name: formData.fullName,
  email: formData.email,
  password: formData.password
});

      const res = await axios.post('/api/auth/register', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (onSuccess) onSuccess(user);
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || 'Authentication failed');
  }

  setLoading(false);
};

  return (
    <div className="w-full max-w-md mx-auto px-4 font-sans text-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2 tracking-tight">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <p className="text-gray-500 text-sm">
          {isLogin ? 'Sign in to your account to continue' : 'Be part of our giving community.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
            <FormInput
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange('fullName')}
              placeholder="Enter your full name"
              required
            />
        )}

        <FormInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="Enter your email"
          required
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Enter your password"
          required
          icon={
   <button
      type="button"
      onClick={() => setShowPassword(p => !p)}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
    }
    />
        

        {isLogin && (
  <div className="text-right text-sm mt-1">
    <a
      href="/forgot-password"
      className=" hover:underline"
    >
      Forgot your password?
    </a>
  </div>
)}

        {!isLogin && (
          <FormInput
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder="Confirm your password"
            required
            icon={
    <button
      type="button"
      onClick={() => setShowConfirmPassword(p => !p)}
      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
    >
      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  }
          />
        )}

        <SubmitButton loading={loading}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </SubmitButton>
      </form>

      {showToggle && (
        <div className="mt-6 text-sm text-center text-gray-600">
          <ToggleButton
            isLogin={isLogin}
            onToggle={onToggle}
            primaryText={isLogin ? "Don't have an account? " : "Already have an account? "}
            toggleText={isLogin ? "Sign up" : "Sign in"}
          />
        </div>
      )}
    </div>
  );
};

export default AuthForm;
