import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/Signup";
import Dashboard from "./pages/DashBoard";
import MapPage from "./pages/Map";
import { onAuthStateChanged, User } from "firebase/auth";
import auth from "./firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null); // Explicitly define the type

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // No more TypeScript error
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/map" element={user ? <MapPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
