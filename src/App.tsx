import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import StoreDashboard from "./pages/StoreDashboard";

function App() {
  return (
    <div>
      <h1>Store Ratings App</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/stores" element={<StoreDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
