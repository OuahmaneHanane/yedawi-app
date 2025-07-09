// // AdminDashboard.jsx
// import { useState } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import SidebarAdmin from '../../components/SidebarAdmin';
// import AdminHeader from '../../components/AdminHeader';

// const AdminDashboard = () => {
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();

//   let activeTab = 'dashboard';
//   if (location.pathname.includes('/users')) activeTab = 'users';
//   else if (location.pathname.includes('/pharmacies')) activeTab = 'pharmacies';
//   else if (location.pathname.includes('/requests')) activeTab = 'requests';

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <SidebarAdmin
//         activeTab={activeTab}
//         setActiveTab={(tab) => {
//           setIsMobileOpen(false);
//           if (tab === 'dashboard') navigate('/dashboardAdmin');
//           else navigate(`/dashboardAdmin/${tab}`);
//         }}
//         isMobileOpen={isMobileOpen}
//         setIsMobileOpen={setIsMobileOpen}
//         adminData={{ name: 'Admin Amina' }}
//       />

//       <div className="flex-1 lg:ml-60 transition-all duration-300 bg-gray-50 min-h-screen">
//         <AdminHeader
//           adminName="Admin Amina"
//           onMenuClick={() => setIsMobileOpen(true)}
//           notifications={[]}
//           setNotifications={() => {}}
//         />
//         <main className="max-w-7xl mx-auto p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;