import React, { useState, useEffect } from 'react';

const RequestsManagement = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fakeData = [
      {
        _id: '1',
        beneficiary: { name: 'Oumaima Akdim', email: 'oumaima@gmail.com' },
        prescriptionFile: 'Prescription #1',
        status: 'pending',
        submittedAt: '2025-07-01T12:00:00Z',
      },
      {
        _id: '2',
        beneficiary: { name: 'Youssef Hamdi', email: 'youssef@example.com' },
        prescriptionFile: 'Prescription #2',
        status: 'approved',
        submittedAt: '2025-07-03T10:15:00Z',
      },
      {
        _id: '3',
        beneficiary: { name: 'Fatima Zahra', email: 'fatima@example.com' },
        prescriptionFile: 'Prescription #3',
        status: 'rejected',
        submittedAt: '2025-07-04T15:30:00Z',
      },
      {
        _id: '4',
        beneficiary: { name: 'Khalid Idrissi', email: 'khalid@example.com' },
        prescriptionFile: 'Prescription #4',
        status: 'pending',
        submittedAt: '2025-07-05T09:00:00Z',
      }
    ];

    setRequests(fakeData);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✓';
      case 'pending': return '…';
      case 'rejected': return '✗';
      default: return '•';
    }
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const getAvatarColor = () => 'bg-gradient-to-br from-green-400 to-emerald-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Medical Requests</h1>
          <p className="text-slate-600 text-base mt-1">Review and manage all incoming requests</p>
          <div className="w-20 h-1 bg-green-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-300 text-6xl mb-4">📋</div>
            <p className="text-slate-500 text-lg">No requests available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req, index) => (
              <div
                key={req._id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${getAvatarColor()} flex items-center justify-center text-white font-semibold text-sm shadow-md`}>                          
                        {getInitials(req.beneficiary.name)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base">{req.beneficiary.name}</h3>
                        <p className="text-slate-500 text-xs">{req.beneficiary.email}</p>
                        <div className="mt-1 text-xs text-slate-500 flex gap-4">
                          <span className="flex items-center gap-1">📄 {req.prescriptionFile}</span>
                          <span className="flex items-center gap-1">📅 {new Date(req.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}>
                        {getStatusIcon(req.status)} {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </div>
                      {req.status === 'pending' && (
                        <div className="flex mt-2 gap-2">
                          <button
                            onClick={() => handleStatusChange(req._id, 'approved')}
                            className="px-4 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-full transition shadow"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(req._id, 'rejected')}
                            className="px-4 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-full transition shadow"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsManagement;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/requests/all', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setRequests(response.data);
//       } catch (err) {
//         setError('Failed to fetch requests');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, [token]);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/requests/${id}`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       // تحديث الحالة في الواجهة
//       setRequests((prev) =>
//         prev.map((req) => (req._id === id ? response.data : req))
//       );
//     } catch (err) {
//       console.error('Error updating status:', err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">All Requests</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : requests.length === 0 ? (
//         <p>No requests found.</p>
//       ) : (
//         <div className="space-y-4">
//           {requests.map((req) => (
//             <div
//               key={req._id}
//               className="p-4 border rounded-lg shadow-sm bg-white space-y-2"
//             >
//               <p>
//                 <strong>Beneficiary:</strong>{' '}
//                 {req.beneficiary?.name} ({req.beneficiary?.email})
//               </p>
//               <p><strong>Prescription:</strong> {req.prescriptionFile}</p>
//               <p>
//                 <strong>Status:</strong>{' '}
//                 <span
//                   className={`capitalize font-semibold ${
//                     req.status === 'approved'
//                       ? 'text-green-600'
//                       : req.status === 'pending'
//                       ? 'text-yellow-600'
//                       : 'text-red-600'
//                   }`}
//                 >
//                   {req.status}
//                 </span>
//               </p>
//               <p>
//                 <strong>Submitted:</strong>{' '}
//                 {new Date(req.submittedAt).toLocaleString()}
//               </p>

//               {req.status === 'pending' && (
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleStatusChange(req._id, 'approved')}
//                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleStatusChange(req._id, 'rejected')}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestsPage;