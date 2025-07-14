import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Loader2, AlertCircle, CheckCircle2, CalendarDays } from "lucide-react";

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
    <div className="flex-1 bg-gradient-to-br from-gray-100 to-white p-10 ml-64 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">💖 My Donations</h1>

      {loading && (
        <div className="flex items-center text-blue-500">
          <Loader2 className="animate-spin mr-2" />
          Loading your donations...
        </div>
      )}

      {error && (
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}

      {!loading && donations.length === 0 && (
        <div className="text-gray-500 italic">
          You haven’t made any donations yet. Start making a difference today! ✨
        </div>
      )}

      {!loading && donations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-teal-700">
                  ${donation.amount}
                </h2>
                <CheckCircle2 className="text-green-500" />
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="capitalize">{donation.status}</span>
                </p>
                <p className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {new Date(donation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
