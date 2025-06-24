// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginRegisterPage from './pages/LoginRegisterPage';
import DonationPage from './pages/DonationPage';
import BeneficiaryFormPage from './pages/BeneficiaryFormPage'; // If still needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Page */}
        <Route path="/" element={<LoginRegisterPage />} />

        {/* Donation Page */}
        <Route path="/donate" element={<DonationPage />} />

        {/* Beneficiary Form Page (if still in use) */}
        <Route path="/beneficiary" element={<BeneficiaryFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
