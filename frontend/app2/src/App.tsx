import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";

import FictionCreate from "./components/fiction/FictionCreate";
import ShowFictions from "./components/fiction/ShowFiction";
import FictionUpdate from "./components/fiction/FictionUpdate";
import WriterTable from "./components/writer/WriterTable";
import WriterCreate from "./components/writer/WriterCreate";
import WriterUpdate from "./components/writer/WriterUpdate";
import DashBoard from "./components/DashBoard/Dashboard";

export default function App() {
  const { id } = useParams();
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    
    return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/writer/create" element={<WriterCreate />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </BrowserRouter>)
  }

  return (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/fiction-create" element={<FictionCreate/>}/>
        <Route path="/fiction-show" element={<ShowFictions/>}/>
        <Route path="/fiction-update/:id" element={<FictionUpdate/>}/>
        <Route path="/writers" element={<WriterTable/>}/>
        <Route path="/writer/create" element={<WriterCreate/>}/>
        <Route path="/writer/update/:id" element={<WriterUpdate/>}/>
      </Routes>
    </div>
  </Router>
  );
}