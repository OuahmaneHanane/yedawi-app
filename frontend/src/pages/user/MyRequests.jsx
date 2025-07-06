import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const MyRequests = () => {
  const { user } = useOutletContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/requests/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />

      <main className="flex-1 bg-gray-50 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-4">My Requests</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li
                key={req._id}
                className="bg-white shadow-sm rounded-lg p-4 border"
              >
                <p><strong>Type:</strong> {req.assistanceType || "General Assistance"}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <p><strong>Pharmacy Code:</strong> {req.pharmacyCode || "Pending"}</p>
                <p><strong>Created At:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default MyRequests;
