import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import Calendar from "./components/Dashboard/Calendar";
import YourWorks from "./components/Dashboard/YourWorks";
import Community from "./components/Dashboard/Community";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Fix: Ensure homepage exists */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;