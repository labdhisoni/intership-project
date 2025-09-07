import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [newStore, setNewStore] = useState({ name: "", address: "", ownerEmail: "" });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("users") || "[]");
    const s = JSON.parse(localStorage.getItem("stores") || "[]");
    setUsers(u);
    setStores(s);
  }, []);

  const saveStores = (updated: any[]) => {
    setStores(updated);
    localStorage.setItem("stores", JSON.stringify(updated));
  };

  const handleAddStore = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newStore.name || !newStore.ownerEmail) {
      alert("Please provide store name and select owner.");
      return;
    }
    const created = { id: Date.now(), name: newStore.name, address: newStore.address, ownerEmail: newStore.ownerEmail, ratings: [] };
    const updated = [...stores, created];
    saveStores(updated);
    setNewStore({ name: "", address: "", ownerEmail: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // owners list
  const owners = users.filter((u) => u.role === "owner");

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <section style={{ marginTop: 20 }}>
        <h3>Add Store</h3>
        <form onSubmit={handleAddStore}>
          <input placeholder="Store name" value={newStore.name} onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} />
          <br />
          <input placeholder="Address (optional)" value={newStore.address} onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} />
          <br />
          <select value={newStore.ownerEmail} onChange={(e) => setNewStore({ ...newStore, ownerEmail: e.target.value })}>
            <option value="">Select owner</option>
            {owners.map((o) => (
              <option key={o.email} value={o.email}>
                {o.name} ({o.email})
              </option>
            ))}
          </select>
          <br />
          <button type="submit">Add Store</button>
        </form>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>All Stores</h3>
        <ul>
          {stores.map((s) => (
            <li key={s.id}>
              <strong>{s.name}</strong> — Owner: {s.ownerEmail || "—"} — Avg:
              {s.ratings && s.ratings.length ? ` ${(s.ratings.reduce((a:any,b:any)=>a+b.value,0)/s.ratings.length).toFixed(1)}` : " No ratings"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
