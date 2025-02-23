import { FaSearch, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar({ colors, sidebarOpen, setSidebarOpen, isDarkMode, setPage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleLogout = () => {
    if (setPage) {
      setPage('home');
    }
  };

  return (
    <nav className={`${colors.navbar} fixed top-0 right-0 left-0 p-4 flex items-center justify-between shadow-md z-20 h-16`}>
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl focus:outline-none">
          ☰
        </button>
        <span className="text-xl font-bold text-purple-500">Planify</span>
        <div className="flex items-center gap-4 ml-8">
          <button onClick={() => setShowAboutModal(true)} className="hover:text-gray-400">About Us</button>
          <button onClick={() => setShowContactModal(true)} className="hover:text-gray-400">Contact Us</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none w-48`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>

        <div className="relative">
          <FaBell size={20} className="cursor-pointer" />
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* About Us Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[600px]">
            <h3 className="text-2xl font-bold mb-4">About Us</h3>
            <p>Welcome to Projex - Your Ultimate Project Management Solution.</p>
            <button onClick={() => setShowAboutModal(false)} className="mt-6 px-4 py-2 bg-purple-600 rounded hover:bg-purple-500">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[600px]">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p>Email: support@projex.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <button onClick={() => setShowContactModal(false)} className="mt-6 px-4 py-2 bg-purple-600 rounded hover:bg-purple-500">
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
