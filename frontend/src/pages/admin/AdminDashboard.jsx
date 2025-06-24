// src/pages/admin/AdminDashboard.jsx
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Sidebar from '../../components/SidebarAdmin';
import AdminHeader from '../../components/AdminHeader';
import StatsGrid from '../../components/Stats-Grid-Admin';
import RequestManagementSection from '../../components/RequestManagementSection';
import UserProfilesSection from '../../components/UserProfilesSection';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Request Submitted',
      message: 'Fatima Zahra submitted a request for Insulin',
      time: '5 minutes ago',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Request Approved',
      message: 'You approved a request for Painkillers',
      time: '1 hour ago',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'System Update',
      message: 'Dashboard has been updated with new features',
      time: '2 hours ago',
      type: 'info',
      read: true
    }
  ]);

  // Admin dynamic data
  const [adminData, setAdminData] = useState({
    name: 'Admin Amina',
    requestsPending: 5,
    approvedCodes: 12,
    profilesReviewed: 42,
  });

  // Example requests
  const [requests, setRequests] = useState([
    { id: 1, beneficiary: 'Fatima Zahra', medicine: 'Insulin', status: 'pending' },
    { id: 2, beneficiary: 'Youssef Ali', medicine: 'Painkillers', status: 'pending' },
    { id: 3, beneficiary: 'Aicha Benali', medicine: 'Antibiotics', status: 'approved' },
  ]);

  // Example profiles
  const [profiles, setProfiles] = useState([
    { id: 101, name: 'Sara El Fassi', age: 45, condition: 'Diabetes' },
    { id: 102, name: 'Khalid Mansouri', age: 32, condition: 'Hypertension' },
    { id: 103, name: 'Nadia Alami', age: 28, condition: 'Asthma' },
  ]);

  const handleApproveRequest = (id) => {
    const request = requests.find(r => r.id === id);
    
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    
    setAdminData(prev => ({
      ...prev,
      approvedCodes: prev.approvedCodes + 1,
      requestsPending: prev.requestsPending - 1,
    }));

    // Add success notification
    const newNotification = {
      id: Date.now(),
      title: 'Request Approved',
      message: `${request.beneficiary}'s request for ${request.medicine} has been approved`,
      time: 'Just now',
      type: 'success',
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        adminData={adminData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role="admin"
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="lg:ml-60 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <AdminHeader 
            adminName={adminData.name} 
            onMenuClick={() => setIsMobileOpen(true)}
            notifications={notifications}
            setNotifications={setNotifications}
          />

          <StatsGrid
            donorData={{
              totalDonations: adminData.approvedCodes,
              beneficiaries: adminData.profilesReviewed,
              rank: adminData.requestsPending,
              thisMonth: 0,
              pending: adminData.requestsPending,
              completed: adminData.approvedCodes,
            }}
            onStatClick={(type) => console.log('Clicked:', type)}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RequestManagementSection 
              requests={requests} 
              onApprove={handleApproveRequest} 
            />
            <UserProfilesSection profiles={profiles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;