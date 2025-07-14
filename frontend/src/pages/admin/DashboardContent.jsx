import React, { useState, useEffect } from 'react';
import StatsGrid from '../../components/Stats-Grid-Admin';
import RequestManagementSection from '../../components/RequestManagementSection';
import UserProfilesSection from '../../components/UserProfilesSection';

const DashboardContent = () => {
  const [adminData, setAdminData] = useState({
    name: 'Admin',
    requestsPending: 0,
    approvedCodes: 0,
    profilesReviewed: 0,
  });

  const [requests, setRequests] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // جلب الطلبات من السيرفر
  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/requests/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();

      const requestsArray = Array.isArray(data) ? data : [];

      setRequests(requestsArray);

      const pending = requestsArray.filter(r => r.status === 'pending').length;
      const approved = requestsArray.filter(r => r.status === 'approved').length;

      setAdminData(prev => ({
        ...prev,
        requestsPending: pending,
        approvedCodes: approved,
      }));
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  // جلب المستخدمين من السيرفر
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();

      const usersArray = Array.isArray(data) ? data : [];

      const filteredProfiles = usersArray.filter(
        user => user.role === 'beneficiary' || user.role === 'donor'
      );

      setProfiles(filteredProfiles);

      setAdminData(prev => ({
        ...prev,
        profilesReviewed: filteredProfiles.length,
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchUsers();
  }, []);

  // دالة الموافقة على طلب وتحديث الحالة والعدادات مع تحديث API
  const handleApproveRequest = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      if (!res.ok) throw new Error('Failed to approve request');

      setRequests(prev =>
        prev.map(r => (r._id === id ? { ...r, status: 'approved' } : r))
      );
      setAdminData(prev => ({
        ...prev,
        approvedCodes: prev.approvedCodes + 1,
        requestsPending: prev.requestsPending - 1,
      }));
    } catch (error) {
      console.error('Approve request error:', error);
    }
  };

  // دالة رفض الطلب مع تحديث API
  const handleRejectRequest = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'rejected' }),
      });
      if (!res.ok) throw new Error('Failed to reject request');

      setRequests(prev =>
        prev.map(r => (r._id === id ? { ...r, status: 'rejected' } : r))
      );
      setAdminData(prev => ({
        ...prev,
        requestsPending: prev.requestsPending - 1,
      }));
    } catch (error) {
      console.error('Reject request error:', error);
    }
  };

  return (
    <div className="p-4">
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <RequestManagementSection
          requests={requests}
          onApprove={handleApproveRequest}
          onReject={handleRejectRequest}
        />
        <UserProfilesSection profiles={profiles} />
      </div>
    </div>
  );
};

export default DashboardContent;