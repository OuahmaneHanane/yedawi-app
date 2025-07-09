import { useEffect, useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
// Removed AdminHeader import

const PharmaciesPage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch('/api/pharmacies')
      .then(res => res.json())
      .then(data => setPharmacies(data))
      .catch(console.error);
  }, []);

  const handleAddPharmacy = async () => {
    const res = await fetch('/api/pharmacies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, address, phone }),
    });

    const newPharmacy = await res.json();
    setPharmacies([...pharmacies, newPharmacy]);
    setName('');
    setAddress('');
    setPhone('');
  };

  const handleDelete = async (id) => {
    await fetch(`/api/pharmacies/${id}`, { method: 'DELETE' });
    setPharmacies(pharmacies.filter((p) => p._id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 overflow-auto">
        {/* Removed AdminHeader to prevent duplicate */}
        <h2 className="text-2xl font-bold mb-6">Manage Pharmacies</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Pharmacy Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded px-4 py-2"
          />
          <button
            onClick={handleAddPharmacy}
            className="bg-emerald-600 text-white rounded px-6 py-2 hover:bg-emerald-700 transition"
          >
            Add Pharmacy
          </button>
        </div>

        <ul className="space-y-3">
          {pharmacies.map((pharmacy) => (
            <li
              key={pharmacy._id}
              className="flex justify-between items-center border rounded p-4 shadow-sm"
            >
              <div>
                <p className="font-semibold">{pharmacy.name}</p>
                <p className="text-sm text-gray-600">{pharmacy.address}</p>
                <p className="text-sm text-gray-600">{pharmacy.phone}</p>
              </div>
              <button
                onClick={() => handleDelete(pharmacy._id)}
                className="text-red-600 hover:text-red-800"
                aria-label={`Delete ${pharmacy.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PharmaciesPage;
