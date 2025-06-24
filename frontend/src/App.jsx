// App.jsx
import React from 'react';
import LoginRegisterPage from './pages/LoginRegisterPage';
import DonationPage from './pages/DonationPage';
import BeneficiaryFormPage from './pages/BeneficiaryFormPage'; // If still needed
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import YedawiDonorDashboard from './pages/donor/YedawiDonorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Page */}
        <Route path="/authpage" element={<LoginRegisterPage />} />

        {/* Donation Page */}
        <Route path="/donate" element={<DonationPage />} />

        {/* Beneficiary Form Page (if still in use) */}
        <Route path="/beneficiary" element={<BeneficiaryFormPage />} />

                <Route path='/' element={<Home/>} />

      {/* Donor Dashboard */}
        <Route path='/dashboardDonor' element={<YedawiDonorDashboard/>} />

      {/* Admin Dashboard */}
        <Route path='/dashboardAdmin' element={<AdminDashboard />} /> {/* ✅ Enabled */}

      </Routes>
    </Router>
  );

}

export default App;

