// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import ProtectedRoute from '../components/ProtectedRoute';

// Public Pages
import Home from '../pages/HomePage';
import LoginRegisterPage from '../pages/LoginRegisterPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';

// User Pages
import DonationPage from '../pages/user/DonationPage';
import RequestPage from '../pages/user/RequestPage';
import UserDashboard from '../pages/user/UserDashboard';
import MyDonations from '../pages/user/MyDonations';
import MyRequests from '../pages/user/MyRequests';
import Notifications from '../pages/user/NotificationsPage';
import Profil from '../pages/user/profil';
import Support from '../pages/Support';

// User Layout
import DashboardLayout from '../layouts/DashboardLayout';

// Admin Pages
import DashboardContent from '../pages/admin/DashboardContent';
import UsersPage from '../pages/admin/UsersPage';
import PharmaciesPage from '../pages/admin/PharmaciesPage';
import RequestsManagement from '../pages/admin/RequestsManagement';
import DonationsPage from '../pages/admin/DonationsPage'; // ✅ New import

// Admin Layout
import AdminLayout from '../layouts/AdminLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/request" element={<RequestPage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="donations" element={<MyDonations />} />
          <Route path="requests" element={<MyRequests />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profil" element={<Profil />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Route>

      {/* Protected Admin Routes */}
      <Route
        path="/dashboardAdmin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardContent />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="pharmacies" element={<PharmaciesPage />} />
        <Route path="requests" element={<RequestsManagement />} />
        <Route path="donations" element={<DonationsPage />} /> {/* ✅ New admin route */}
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
