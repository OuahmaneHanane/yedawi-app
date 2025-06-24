import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import YedawiDonorDashboard from './pages/donor/YedawiDonorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
    return(
        <Router>
    <Routes>
      {/* HomePge route */}
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