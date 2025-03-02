import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState<any[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const driverList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.role === "driver");
      setDrivers(driverList);
    };

    fetchDrivers();
  }, []);

  const toggleApproval = async (id: string, isApproved: boolean) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { isApproved: !isApproved });
    setDrivers((prev) =>
      prev.map((driver) => (driver.id === id ? { ...driver, isApproved: !isApproved } : driver))
    );
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{driver.name}</h2>
            <p className="text-gray-600">{driver.email}</p>
            <p className={`text-sm mt-2 ${driver.isApproved ? "text-green-600" : "text-red-600"}`}>
              {driver.isApproved ? "Approved" : "Not Approved"}
            </p>
            <button
              onClick={() => toggleApproval(driver.id, driver.isApproved)}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md"
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
