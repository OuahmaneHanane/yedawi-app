// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute' 
import Home from '../pages/HomePage';
import LoginRegisterPage from '../pages/LoginRegisterPage';
import DonationPage from '../pages/user/DonationPage';
import RequestPage from '../pages/user/RequestPage';
import UserDashboard from '../pages/user/UserDashboard';

// import AdminDashboard from '../pages/admin/AdminDashboard';
// import DashboardPage from '../pages/admin/DashboardPage';
// import UsersPage from '../pages/admin/UsersPage';
// import PharmaciesPage from '../pages/admin/PharmaciesPage';
// import RequestsPage from '../pages/admin/RequestsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<LoginRegisterPage />} />
      <Route path="/request" element={ <ProtectedRoute><RequestPage /></ProtectedRoute>} />
      <Route path="/donate" element={<ProtectedRoute><DonationPage /></ProtectedRoute>} />      
      <Route path="/mine" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

      {/* Nested admin routes */}
      {/* <Route path="/dashboardAdmin" element={<AdminDashboard />}>
      <Route index element={<DashboardPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="pharmacies" element={<PharmaciesPage />} />
      <Route path="requests" element={<RequestsPage />} /></Route> */}
    </Routes>
  );
};

export default AppRoutes;