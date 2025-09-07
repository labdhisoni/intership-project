import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [ownedStores, setOwnedStores] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!user || user.role !== "owner") {
      navigate("/login");
      return;
    }
    setCurrentUser(user);
    setAllUsers(JSON.parse(localStorage.getItem("users") || "[]"));
    const allStores = JSON.parse(localStorage.getItem("stores") || "[]");
    const mine = allStores.filter((s:any) => s.ownerEmail === user.email);
    setOwnedStores(mine);
    console.log("OwnerDashboard currentUser:", user);
    console.log("OwnerDashboard allStores:", allStores);
  }, [navigate]);

  const getAvg = (ratings:any[]) => (ratings && ratings.length ? (ratings.reduce((a:any,b:any)=>a+b.value,0)/ratings.length).toFixed(1) : "0");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const lookupName = (email:string) => {
    const u = allUsers.find((x:any)=>x.email===email);
    return u ? u.name : email;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Owner Dashboard</h1>
      <p>Welcome {currentUser?.name}</p>

      <section>
        <h3>Your Stores</h3>
        {ownedStores.length === 0 ? <p>No stores assigned to you yet.</p> : (
          <ul>
            {ownedStores.map((s:any) => (
              <li key={s.id} style={{ marginBottom: 12 }}>
                <strong>{s.name}</strong> — Avg: {getAvg(s.ratings)}
                <div style={{ marginLeft: 12 }}>
                  <small>Ratings ({(s.ratings||[]).length}):</small>
                  <ul>
                    {(s.ratings||[]).map((r:any, i:number) => (
                      <li key={i}>{lookupName(r.userEmail)} ({r.userEmail}) → {r.value} ★</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button onClick={handleLogout} style={{ marginTop: 20 }}>Logout</button>
    </div>
  );
};

export default OwnerDashboard;
