import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [usersResponse, messagesResponse] = await Promise.all([
        axiosInstance.get("/users"),
        axiosInstance.get("/messages"),
      ]);

      const usersData = usersResponse.data.users || usersResponse.data;
      setUsers(usersData);
      setTotalUsers(usersResponse.data.totalUsers || usersData.length);
      setTotalMessages(messagesResponse.data.totalMessages || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axiosInstance.delete(`/users/${id}`);
      toast.success("User deleted");
      setUsers((u) => u.filter((x) => x._id !== id && x.id !== id));
      setTotalUsers((count) => Math.max(count - 1, 0));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div>Total users: {totalUsers}</div>
            <div>Total messages: {totalMessages}</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading users...</div>
        ) : (
          <div className="space-y-3">
            {users.length === 0 && <div className="text-gray-500">No users found.</div>}
            {users.map((u) => (
              <div key={u._id || u.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-sm text-gray-500">{u.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => deleteUser(u._id || u.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
