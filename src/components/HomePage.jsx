import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { FaCheckCircle } from "react-icons/fa";

export default function HomePage() {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null); // 

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-500">Planify</span>
        </h1>
        <div className="space-x-6">
          {/* <a href="#features" className="hover:text-gray-400">Features</a>
          <a href="#benefits" className="hover:text-gray-400">Benefits</a>
          <a href="#team" className="hover:text-gray-400">Team</a> */}
          <Button variant="secondary" onClick={() => navigate("/signin")} className="bg-purple-600 hover:bg-purple-500">
            Sign In
          </Button>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-6xl font-bold">
            Simplify Your Projects with <span className="text-purple-500">Planify</span>
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl">
            Take control of your projects and stay on top of your goals with our
            intuitive project management app. Say goodbye to chaos and hello to
            streamlined efficiency.
          </p>
          <Button variant="secondary" onClick={() => navigate("/signup")} className="mt-6 bg-purple-600 hover:bg-purple-500">
            Get Started
          </Button>
        </div>
             {/* Right Side - Image */}
             <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src="1.png"  
            alt="Project Management" wid
          />
        </div>
      </section>

      {/* Modal Overlay */}
      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                {modalType === "signin" ? "Sign In" : "Create Account"}
              </h2>
              <button
                onClick={() => setModalType(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {modalType === "signin" && (
              
              <form onSubmit={handleSignIn}>
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg mb-4"
                >
                  Sign In with GitHub
                </button>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-600" />
                  <span className="mx-2 text-gray-400">or</span>
                  <hr className="flex-grow border-gray-600" />
                </div>

                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg"
                >
                  Sign In
                </button>

                <div className="text-center mt-4 text-sm">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-400 hover:underline"
                    onClick={() => setModalType("signup")}
                  >
                    Create Account
                  </button>
                </div>
              </form>
            )}

            {modalType === "signup" && (
              <form onSubmit={handleSignUp}>
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg mb-4"
                >
                  Sign Up with GitHub
                </button>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-600" />
                  <span className="mx-2 text-gray-400">or</span>
                  <hr className="flex-grow border-gray-600" />
                </div>

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg"
                >
                  Sign Up
                </button>

                <div className="text-center mt-4 text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-400 hover:underline"
                    onClick={() => setModalType("signin")}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Features Section
      <section id="features" className="py-20 px-6 bg-gray-800 text-center">
        <h3 className="text-3xl font-bold">Features</h3>
        <p className="text-gray-400 mt-2">Explore what makes Planify unique.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
            <FaCheckCircle className="text-purple-500 text-4xl mx-auto" />
            <h4 className="text-xl font-semibold mt-4">Task Management</h4>
            <p className="text-gray-400">
              Easily create, assign, and track tasks.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
            <FaCheckCircle className="text-purple-500 text-4xl mx-auto" />
            <h4 className="text-xl font-semibold mt-4">Collaboration</h4>
            <p className="text-gray-400">
              Seamlessly work with your team in real-time.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
            <FaCheckCircle className="text-purple-500 text-4xl mx-auto" />
            <h4 className="text-xl font-semibold mt-4">Analytics</h4>
            <p className="text-gray-400">
              Gain insights with powerful reporting tools.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {/* <section id="benefits" className="py-20 px-6 text-center">
        <h3 className="text-3xl font-bold">Benefits</h3>
        <p className="text-gray-400 mt-2">
          Why choose Planify for your projects?
        </p>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center justify-center space-x-2">
            <FaCheckCircle className="text-purple-500" />
            <span>Increased efficiency and productivity</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <FaCheckCircle className="text-purple-500" />
            <span>Better team collaboration</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <FaCheckCircle className="text-purple-500" />
            <span>Detailed project tracking</span>
          </li>
        </ul>
      </section> */ }

      {/* Team Section
      <section id="team" className="py-20 px-6 bg-gray-900 text-center">
        <h3 className="text-3xl font-bold text-white">Meet Our Team</h3>
        <p className="text-gray-400 mt-2">The minds behind Planify.</p>
        <div className="flex justify-center mt-8">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-80">
            <h4 className="text-xl font-semibold text-white">
              Sahil Brahmankar
            </h4>
            <p className="text-gray-400">Founder & Developer</p>
          </div>
        </div>
      </section> */}

      <footer className="bg-gray-800 text-gray-400 text-center py-3 mt-10">
        <p>Planify © 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}