import { useEffect, useState } from "react";
import { getDrivers, toggleDriverApproval } from "../services/firestoreservice";
import { useNavigate } from "react-router-dom";

interface Driver {
  id: string;
  email: string;
  name: string;
  isApproved: boolean;
  role: string;
}

const Dashboard = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      const data = await getDrivers();
      setDrivers(data);
    };
    fetchDrivers();
  }, []);

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    await toggleDriverApproval(id, !currentStatus);
    setDrivers((prev) =>
      prev.map((driver) => (driver.id === id ? { ...driver, isApproved: !currentStatus } : driver))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={() => navigate("/map")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        View Bus Locations
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="border p-4 rounded-lg shadow-md">
            <p><strong>Name:</strong> {driver.name}</p>
            <p><strong>Email:</strong> {driver.email}</p>
            <p><strong>Role:</strong> {driver.role}</p>
            <button
              onClick={() => handleToggleApproval(driver.id, driver.isApproved)}
              className={`mt-2 px-4 py-2 rounded-lg ${driver.isApproved ? "bg-red-500" : "bg-green-500"} text-white`}
            >
              {driver.isApproved ? "Revoke Approval" : "Approve"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
