import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/dashboard"); // ✅ Redirect to Dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

        <button
          onClick={() => navigate("/dashboard")} // ✅ Fix navigation
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg mb-4"
        >
          Sign In with GitHub
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <form onSubmit={handleSignIn}>
          <input type="text" placeholder="Email/Username" className="w-full p-2 mb-4 rounded bg-gray-700 text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-2 mb-4 rounded bg-gray-700 text-white" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg">
            Sign In
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <button className="text-blue-400 hover:underline" onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
