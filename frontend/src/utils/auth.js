// src/utils/auth.js

// export const isLoggedIn = () => {
//   const token = localStorage.getItem('token');
//   const user = localStorage.getItem('user');
//   return token && user;
// };

export const getUser = () => {
  const user = localStorage.getItem('user');
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw && raw !== 'undefined' ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isLoggedIn = () => !!getStoredUser();