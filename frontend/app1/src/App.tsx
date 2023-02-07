import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Admin from "./components/Admin";
import AdminCreate from "./components/AdminCreate"
import AdminUpdate from "./components/AdminUpdate";



export default function App() {
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  return (
  <Router>
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}/> {}
        <Route path="/admins" element={<Admin />}/>{}
        <Route path="/admin_create" element={<AdminCreate />}/>{}
        <Route path="/admin/update/:id" element={<AdminUpdate />}/>{}
      </Routes>
    </div>
  </Router>
  );
}