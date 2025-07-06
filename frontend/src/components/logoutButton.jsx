import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // or navigate('/') if you prefer
  };

  return (
    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
      <LogOut className="w-4 h-4" /> Logout
    </button>
  );
};

export default LogoutButton;
