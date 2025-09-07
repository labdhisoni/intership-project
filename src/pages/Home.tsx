import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Store Ratings ⭐
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        A platform where users can rate stores, admins can manage stores, and owners
        can view ratings for their businesses.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
