import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

import FictionCreate from "./components/fiction/FictionCreate";
import WriterTable from "./components/writer/WriterTable";
import AddContent from "./components/fiction/AddContent";

import WriterCreate from "./components/writer/WriterCreate";

import ShowFictions from "./components/fiction/ShowFiction";
import WriterUpdate from "./components/writer/WriterUpdate";



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
    // return <SignIn />;
    return(<BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/writer/create" element={<WriterCreate />} />
            {/* if try to locate other path than this it will auto redirect to signin */}
            <Route path="*" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
    )
    
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
        <Route path="/writer/create" element={<WriterCreate/>}/>
        <Route path="/writer/update/:id" element={<WriterUpdate/>}/>
      </Routes>
    </div>
  </Router>
  );
}