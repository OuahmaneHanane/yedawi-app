import { useEffect, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance'; // or correct path


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get('/admin/users');

        setUsers(res.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setUsers(users.filter((user) => user._id !== id));
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    if (user.role === 'admin') return false;
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) return <p className="text-center text-green-700 font-medium">Loading users...</p>;
  if (error) return <p className="text-center text-red-500 font-medium">{error}</p>;

  return (
    <div className="min-h-[75vh] bg-white p-4 sm:p-6 font-sans text-slate-800">
      <div className="max-w-7xl w-full mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 via-emerald-200 to-green-400 p-5 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center mb-6 text-white">
          <div>
            <h1 className="text-xl font-bold">Users Management</h1>
            <p className="text-sm font-medium opacity-90 mt-1">Manage all system users</p>
          </div>
          <div className="mt-4 sm:mt-0 text-center sm:text-right">
            <div className="text-xl font-extrabold">{filteredUsers.length}</div>
            <div className="text-sm font-medium opacity-90">Total Users</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-2 rounded-xl shadow-md mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
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
            <div className="text-sm text-green-700 font-medium text-center md:text-right">
              Showing {filteredUsers.length} of {users.length}
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="w-full overflow-x-auto rounded-xl shadow-md border border-gray-200 hidden sm:block">
          <table className="w-full min-w-[600px] text-sm text-left font-medium">
            <thead className="bg-emerald-400 text-emerald-900 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Join Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-6 text-center text-gray-500 font-semibold">
                    No users found.
                  </td>
                </tr>
              )}
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-green-50 transition-shadow shadow-sm">
                  <td className="px-6 py-3 min-w-[120px]">
                    <div className="font-semibold text-slate-900 truncate">{user.name}</div>
                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-600 whitespace-nowrap">
                    {new Date(user.joinDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-3 text-center whitespace-nowrap">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => toggleStatus(user._id)}
                        className={`text-white px-3 py-1 rounded-full text-xs ${
                          user.status === 'active'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
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
        <div className="sm:hidden space-y-4 mt-4">
          {filteredUsers.map((user) => (
            <div key={user._id} className="p-4 rounded-xl shadow border bg-white">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="text-base font-bold text-emerald-900 truncate">{user.name}</div>
                  <div className="text-xs text-emerald-600 truncate">{user.email}</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-600 mb-2">
                Joined:{' '}
                {new Date(user.joinDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => toggleStatus(user._id)}
                  className={`text-white px-3 py-1 rounded-full text-xs ${
                    user.status === 'active'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:bg-red-100 p-1.5 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;