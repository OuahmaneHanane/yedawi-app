import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const MyDonations = () => {
  const { user } = useOutletContext();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/donations/my-donations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(response.data);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Could not load donations.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="flex-1 bg-gray-50 p-8 ml-64">
      <h1 className="text-2xl font-bold mb-4">My Donations</h1>

      {loading && <p>Loading donations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && donations.length === 0 && (
        <p className="text-gray-500">You haven’t made any donations yet.</p>
      )}

      {!loading && donations.length > 0 && (
        <ul className="space-y-4">
          {donations.map((donation) => (
            <li
              key={donation._id}
              className="bg-white shadow-sm rounded-lg p-4 border"
            >
              <p>
                <strong>Amount:</strong> {donation.amount} USD
              </p>
              <p>
                <strong>Status:</strong> {donation.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(donation.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDonations;
