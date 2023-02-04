import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

import FictionCreate from "./components/fiction/FictionCreate";
import WriterTable from "./components/writer/WriterTable";
import AddContent from "./components/fiction/AddContent";
import ShowFictions from "./components/fiction/ShowFiction";


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
    return <SignIn />;
  }

  return (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} /> {/** home */}
        <Route path="/fiction-create" element={<FictionCreate/>}/>
        <Route path="/fiction-add" element={<AddContent/>}/>
        <Route path="/fiction-show" element={<ShowFictions/>}/>
        <Route path="/writers" element={<WriterTable/>}/>
      </Routes>
    </div>
  </Router>
  );
}