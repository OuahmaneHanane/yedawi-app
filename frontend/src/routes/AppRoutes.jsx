// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute' 
import Home from '../pages/HomePage';
import LoginRegisterPage from '../pages/LoginRegisterPage';
import DonationPage from '../pages/user/DonationPage';
import RequestPage from '../pages/user/RequestPage';
import UserDashboard from '../pages/user/UserDashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import MyDonations from '../pages/user/MyDonations';
import MyRequests from '../pages/user/MyRequests';
import Notifications from '../pages/user/NotificationsPage';
import Profil from '../pages/user/profil';
import Support from '../pages/Support';

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

      {/* Public pages inside protection */}
      <Route element={<ProtectedRoute />}>
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/request" element={<RequestPage />} />

        {/* Protected Dashboard layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="donations" element={<MyDonations />} />
          <Route path="requests" element={<MyRequests />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profil" element={<Profil />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Route>

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