import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import app from "../firebase/firebase";

const db = getFirestore(app);

// Fetch all drivers from Firestore
export const getDrivers = async () => {
  const driversRef = collection(db, "users");
  const q = query(driversRef, where("role", "==", "driver"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Toggle isApproved for a driver
export const toggleApproval = async (userId: string, currentStatus: boolean) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { isApproved: !currentStatus });
};
