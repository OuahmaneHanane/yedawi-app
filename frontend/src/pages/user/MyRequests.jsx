import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { Loader2, FileQuestion, ClipboardList, CalendarCheck2 } from "lucide-react";

const MyRequests = () => {
  const { user } = useOutletContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/user/requests/my-requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
    <div className="flex min-h-screen bg-gradient-to-br from-[#f9f9fb] to-[#ffffff]">
      <Sidebar user={user} />

      <main className="flex-1 p-10 ml-64">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#1e2a3a] mb-2 flex items-center gap-2">
            <ClipboardList className="text-green-600" />
            My Requests
          </h1>
          <p className="text-gray-600">
            Here’s a list of the assistance requests you’ve submitted.
          </p>
        </div>

        {loading && (
          <div className="flex items-center text-indigo-600 text-lg animate-pulse">
            <Loader2 className="animate-spin mr-2" />
            Fetching your requests...
          </div>
        )}

        {error && (
          <div className="text-red-500 font-medium mt-4">{error}</div>
        )}

        {!loading && requests.length === 0 && (
          <div className="flex flex-col items-center mt-20 text-gray-500">
            <FileQuestion size={48} className="mb-4 animate-fadeIn" />
            <p className="text-xl font-medium mb-1">No requests found.</p>
            <p className="text-sm italic text-center max-w-sm">
              You haven’t requested help yet. Submit your first request and we'll take care of the rest.
            </p>
          </div>
        )}

        {!loading && requests.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-[#2e2e2e]">
                    {req.assistanceType || "General Assistance"}
                  </h2>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      req.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Pharmacy Code:</span>{" "}
                  {req.pharmacyCode || "Pending"}
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <CalendarCheck2 className="w-4 h-4 mr-1" />
                  {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyRequests;
