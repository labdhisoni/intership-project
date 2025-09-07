import React, { useEffect, useState } from "react";

interface Store {
  id: number;
  name: string;
  owner: string | null;
  averageRating: number | null;
  userRating?: number | null;
}

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);

  useEffect(() => {
    // Temporary mock data
    const mockStores: Store[] = [
      { id: 1, name: "Sampada", owner: "shreya@gmail.com", averageRating: 4.5, userRating: 4 },
      { id: 2, name: "Raisoni Jewellers", owner: "labdhi@gmail.com", averageRating: 3.8, userRating: null },
      { id: 3, name: "Tech Bazaar", owner: null, averageRating: null, userRating: null },
      { id: 4, name: "Fashion Hub", owner: "neha@gmail.com", averageRating: 2.9, userRating: 3 },
    ];
    setStores(mockStores);
  }, []);

  const handleRating = (storeId: number, rating: number) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, userRating: rating } : store
      )
    );
  };

  // Filter + Search logic
  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating =
      minRating === null || (store.averageRating ?? 0) >= minRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Stores</h2>

      {/* 🔍 Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search store by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/2"
        />

        <select
          value={minRating ?? ""}
          onChange={(e) =>
            setMinRating(e.target.value ? parseInt(e.target.value) : null)
          }
          className="border rounded-lg px-3 py-2 w-full md:w-1/4"
        >
          <option value="">Filter by Rating</option>
          <option value="1">⭐ 1 and above</option>
          <option value="2">⭐ 2 and above</option>
          <option value="3">⭐ 3 and above</option>
          <option value="4">⭐ 4 and above</option>
        </select>
      </div>

      {/* 🏪 Store List */}
      <ul className="space-y-3">
        {filteredStores.map((store) => (
          <li
            key={store.id}
            className="border p-3 rounded-lg shadow-sm bg-white"
          >
            <h3 className="font-semibold">{store.name}</h3>
            <p className="text-sm text-gray-600">
              Owner: {store.owner ?? "No owner assigned"}
            </p>
            <p className="text-sm text-yellow-600">
              ⭐ Average Rating:{" "}
              {store.averageRating !== null
                ? store.averageRating.toFixed(1)
                : "Not rated yet"}
            </p>

            {/* ⭐ User Rating */}
            <div className="mt-2">
              <span className="text-sm font-medium">Your Rating: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(store.id, star)}
                  className={`text-2xl ${
                    store.userRating && store.userRating >= star
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
              {store.userRating && (
                <span className="ml-2 text-sm text-gray-700">
                  You rated: {store.userRating} ⭐
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
