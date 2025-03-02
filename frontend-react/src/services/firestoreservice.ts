import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import app from "../firebase/firebase";

const db = getFirestore(app);

interface User {
  id: string;
  email: string;
  role: string;  
  isApproved: boolean;
  name: string;
}


export interface Bus {
  id: string;
  bus_no: number;
  drivername: string;
  key: string;
  latitude: number;
  longitude: number;
}

export const getDrivers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as User))
    .filter((user) => user.role === "driver"); 
};

export const toggleDriverApproval = async (userId: string, isApproved: boolean) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { isApproved: !isApproved });
};

export const getBuses = async (): Promise<Bus[]> => {
  const querySnapshot = await getDocs(collection(db, "buses"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Bus));
};