import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

import FictionCreate from "./components/fiction/FictionCreate";
import Writer from "./components/writer/ShowWriter";


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
<<<<<<< HEAD
        <Route path="/fiction-create" element={<FictionCreate/>}/>
=======
        <Route path="/writers" element={<Writer/>} />
>>>>>>> a516b02192a3db3e214c7c2fa6abf6412fc3c514
      </Routes>
    </div>
  </Router>
  );
}