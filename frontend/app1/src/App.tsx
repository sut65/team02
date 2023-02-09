import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Admin from "./components/Admin";
import AdminCreate from "./components/AdminCreate"
import AdminUpdate from "./components/AdminUpdate";
import AdminList from "./components/AdminList"
import BannerCreate from "./components/BannerCreate";
import BannerList from "./components/BannerList";
import BannerUpdate from "./components/BannerUpdate"



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
        <Route path="/adminslist" element={<AdminList />}/>{}
        <Route path="/banner_c" element={<BannerCreate />}/>{}
        <Route path="/banner_list" element={<BannerList />}/>{}
        {/* <Route path="/pr/update/:id" element={<BannerUpdate />}/>{} */}
      </Routes>
    </div>
  </Router>
  );
}