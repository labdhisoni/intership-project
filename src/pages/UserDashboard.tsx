import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = ({ user }: { user: any }) => {
  const [stores, setStores] = useState<any[]>([]);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // Fetch all stores
    axios.get("http://localhost:3000/stores").then((res) => {
      setStores(res.data);
    });
  }, []);

  const handleRating = async (storeId: number, score: number) => {
    try {
      await axios.post("http://localhost:3000/ratings", {
        score,
        userId: user.id,
        storeId,
      });

      // update ratings locally
      setRatings((prev) => ({ ...prev, [storeId]: score }));

      alert(`You rated Store ${storeId} with ${score} stars`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {user.name}</h1>
      <h2 className="text-xl mb-2">Available Stores</h2>
      {stores.map((store) => (
        <div
          key={store.id}
          className="border rounded-lg p-4 shadow-md mb-4 bg-white"
        >
          <h3 className="font-semibold">{store.name}</h3>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(store.id, star)}
                className={`text-2xl ${
                  ratings[store.id] >= star ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-sm mt-1">
            Your rating: {ratings[store.id] || "Not rated yet"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
