import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/DashBoard/Dashboard";
import SignIn from "./components/SignIn";
import Admin from "./components/Admin/Admin";
import AdminCreate from "./components/Admin/AdminCreate"
import AdminUpdate from "./components/Admin/AdminUpdate";
import AdminList from "./components/Admin/AdminList"
import BannerCreate from "./components/Public Relation/BannerCreate";
import BannerList from "./components/Public Relation/BannerList";
import BannerUpdate from "./components/Public Relation/BannerUpdate"
import ReportFictionList from "./components/ReportFictionList";
import BannerShow from "./components/Public Relation/BannerShow";
import Profile from "./components/Profile";



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
        <Route path="/banner_lists" element={<BannerShow />}/>{}
        <Route path="/report-fiction-list" element={<ReportFictionList />} />{}
        <Route path="/profile" element={<Profile />} />{}
      </Routes>
    </div>
  </Router>
  );
}