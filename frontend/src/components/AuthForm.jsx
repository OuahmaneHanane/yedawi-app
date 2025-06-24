import React, { useState } from 'react';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import ToggleButton from './ToggleButton';

const AuthForm = ({ isLogin, onToggle, isAnimating, showToggle = true }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(isLogin ? 'Login' : 'Register', formData);

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <p className="text-gray-600">
          {isLogin ? 'Sign in to your account to continue' : 'Be part of our community.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Enter your password"
          required
        />

        {!isLogin && (
          <FormInput
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder="Confirm your password"
            required
          />
        )}

        <SubmitButton loading={loading}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </SubmitButton>
      </form>

      {showToggle && (
      <div className="mt-6">
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
