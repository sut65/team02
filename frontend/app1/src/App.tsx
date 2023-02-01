import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Admin from "./components/Admin";



export default function App() {
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  const menu = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "รายชื่อผู้ดูแลระบบ", icon: <SupervisorAccountIcon />, path: "/admin" },
  ];

  return (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route 
          path="/" element={<Home/>}/> {},
      </Routes>
    </div>
  </Router>
  );
}