import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const response = await axiosInstance.get('/donations');
      setDonations(response.data);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="min-h-[75vh] bg-white p-4 sm:p-6 font-sans text-slate-800">
      <div className="max-w-7xl w-full mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-green-400 via-emerald-200 to-green-400 p-5 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center mb-6 text-white">
          <div>
            <h1 className="text-xl font-bold">Donations Management</h1>
            <p className="text-sm font-medium opacity-90 mt-1">View and manage all donations made through the system</p>
          </div>
          <div className="mt-4 sm:mt-0 text-center sm:text-right">
            <div className="text-xl font-extrabold">{donations.length}</div>
            <div className="text-sm font-medium opacity-90">Total Donations</div>
          </div>
        </div>

        {/* Content Card */}
        <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
          {loading ? (
            <p className="p-6 text-center text-green-700 font-medium">Loading donations...</p>
          ) : donations.length === 0 ? (
            <p className="p-6 text-center text-gray-500 font-semibold">No donations found.</p>
          ) : (
            <table className="min-w-[700px] sm:min-w-full text-sm text-left font-medium">
              <thead className="bg-emerald-400 text-emerald-900 uppercase text-xs tracking-wider rounded-t-2xl">
                <tr>
                  <th className="px-6 py-3 rounded-tl-2xl">Donor</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 rounded-tr-2xl">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr
                    key={d._id}
                    className="hover:bg-green-50 transition-shadow shadow-sm cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium truncate max-w-xs">
                      {d.fullName || d.user?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm truncate max-w-xs">
                      {d.email || d.user?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {d.amount.toLocaleString()} MAD
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {new Date(d.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            d.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : d.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        `}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationsPage;
