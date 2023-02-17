import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/DashBoard/Dashboard";
import SignIn from "./components/SignIn";
import Admin from "./components/Admin";
import AdminCreate from "./components/AdminCreate"
import AdminUpdate from "./components/AdminUpdate";
import AdminList from "./components/AdminList"
import BannerCreate from "./components/BannerCreate";
import BannerList from "./components/BannerList";
import BannerUpdate from "./components/BannerUpdate"
import ReportFictionList from "./components/ReportFictionList";



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

  return (
  <Router>
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />}/> {}
        <Route path="/admins" element={<Admin />}/>{}
        <Route path="/admin_create" element={<AdminCreate />}/>{}
        <Route path="/admin/update/:id" element={<AdminUpdate />}/>{}
        <Route path="/pr/update/:id" element={<BannerUpdate />}/>{}
        <Route path="/adminslist" element={<AdminList />}/>{}
        <Route path="/banner_c" element={<BannerCreate />}/>{}
        <Route path="/banner_list" element={<BannerList />}/>{}
        <Route path="/report-fiction-list" element={<ReportFictionList />} />{}
      </Routes>
    </div>
  </Router>
  );
}