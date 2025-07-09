import { useState } from 'react';
import { Search, Trash2, Pencil } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([
    { _id: '1', name: 'Oumaima Akdim', email: 'oumaima@gmail.com', role: 'admin', joinDate: '2024-01-15', status: 'active' },
    { _id: '2', name: 'Ahmed Said', email: 'ahmed@example.com', role: 'donor', joinDate: '2024-02-20', status: 'active' },
    { _id: '3', name: 'Fatima Zahra', email: 'fatima@example.com', role: 'beneficiary', joinDate: '2024-03-10', status: 'inactive' },
    { _id: '4', name: 'Youssef Benali', email: 'youssef@example.com', role: 'admin', joinDate: '2024-01-28', status: 'active' },
    { _id: '5', name: 'Salma Idrissi', email: 'salma@example.com', role: 'donor', joinDate: '2024-04-05', status: 'pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setUsers(users.filter((user) => user._id !== id));
  };

  // لون roles متناسق مع صفحة Requests
  const getRoleColor = (role) => {
    if (role === 'beneficiary') return 'bg-green-100 text-green-700 font-semibold';
    if (role === 'donor') return 'bg-emerald-50 text-green-700 font-semibold';
    return 'bg-slate-100 text-slate-500'; // لل roles الأخرى (لو ظهرت)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-600';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // هنا فلترة باش مايبانوش admins و باش الفلترة والبحث يخدمو مزيان
  const filteredUsers = users.filter((user) => {
    if (user.role === 'admin') return false; // استبعد admins
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-[75vh] bg-white p-4 sm:p-6 font-sans text-slate-800">
      <div className="max-w-7xl w-full mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 via-emerald-200 to-green-400 p-5 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center mb-6 text-white">
          <div>
            <h1 className="text-xl font-bold">Users Management</h1>
            <p className="text-sm font-medium opacity-90 mt-1">Manage all system users and their roles</p>
          </div>
          <div className="mt-4 sm:mt-0 text-center sm:text-right">
            <div className="text-xl font-extrabold">{filteredUsers.length}</div>
            <div className="text-sm font-medium opacity-90">Total Users</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-2 rounded-xl shadow-md mb-6 border border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none font-medium text-slate-800 shadow-sm text-sm"
                />
                <Search className="absolute top-2 left-3 w-4 h-4 text-green-700" />
              </div>

              {/* Role Filter */}
              <div className="relative w-full sm:w-36 mt-2 sm:mt-0">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none font-medium text-slate-800 shadow-sm text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="beneficiary">Beneficiary</option>
                  <option value="donor">Donor</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-green-700 font-medium text-center md:text-right">
              Showing {filteredUsers.length} of {users.length}
            </div>
          </div>
        </div>

        {/* Table for Desktop */}
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 hidden sm:block">
          <table className="min-w-[600px] sm:min-w-full text-sm text-left font-medium">
            <thead className="bg-emerald-400 text-emerald-900 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 sm:px-6 py-3">User</th>
                <th className="px-4 sm:px-6 py-3">Role</th>
                <th className="px-4 sm:px-6 py-3">Status</th>
                <th className="px-4 sm:px-6 py-3">Join Date</th>
                <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-gray-500 font-semibold">
                    No users found.
                  </td>
                </tr>
              )}
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-green-50 transition-shadow shadow-sm">
                  <td className="px-4 sm:px-6 py-3 min-w-[120px]">
                    <div className="font-semibold text-slate-900 truncate">{user.name}</div>
                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 min-w-[90px]">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 min-w-[90px]">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 min-w-[110px] text-xs text-slate-600 whitespace-nowrap">
                    {new Date(user.joinDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center whitespace-nowrap min-w-[110px]">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => alert(`Edit user: ${user.name}`)}
                        className="text-green-700 hover:bg-green-100 p-2 rounded-lg transition"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4">
          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-500 font-semibold py-10">No users found.</div>
          )}
          {filteredUsers.map((user) => (
            <div key={user._id} className="p-3 rounded-xl shadow-md border-white bg-white">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="text-base font-bold text-emerald-900 truncate">{user.name}</div>
                  <div className="text-xs text-emerald-00 truncate">{user.email}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Edit user: ${user.name}`)}
                    className="text-green-700 hover:bg-green-100 p-1.5 rounded-lg transition"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:bg-red-100 p-1.5 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-sm mb-1">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
              <div className="text-[11px] text-slate-600 mt-1">
                Joined:{' '}
                {new Date(user.joinDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;