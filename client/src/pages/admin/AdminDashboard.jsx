import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/users");
      setUsers(data.users || data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axiosInstance.delete(`/users/${id}`);
      toast.success("User deleted");
      setUsers((u) => u.filter((x) => x._id !== id && x.id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <div className="text-sm text-gray-600">Total users: {users.length}</div>
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