import * as React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import FictionInfo from "./components/fiction/FictionInfo";
import FictionInfoDetail from "./components/fiction/FictionInfoDetail";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import { WriterInterface } from "./interfaces/writer/IWriter";
=======
import ReviewTable from "./components/review/ReviewTable";
>>>>>>> a516b02192a3db3e214c7c2fa6abf6412fc3c514
import FeedbackCreate from "./components/feedback/FeedbackCreate";
import ReaderProfile from "./components/reader/ReaderProfile";




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
        <Route path="/" element={<Home/>} /> 
        <Route path="/fictions" element={<FictionInfo  />} /> 
        <Route path="/fiction/:id" element={<FictionInfoDetail id={String(id)} />} />
        <Route path="/feedback-create" element={<FeedbackCreate />}/> 
        <Route path="/reader-create" element={<ReaderProfile />}/>
        <Route path="/reviews" element={<ReviewTable />}/>
      </Routes>
    </div>
  </Router>
  );
}