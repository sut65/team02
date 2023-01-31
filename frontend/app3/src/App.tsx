import * as React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import FictionInfo from "./components/FictionInfo";
import FictionInfoDetail from "./components/FictionInfoDetail";
import { useParams } from "react-router-dom";
import { WriterInterface } from './interfaces/IWriter';
import FeedbackCreate from "./components/feedback/FeedbackCreate";




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
        <Route path="/feedbacks" element={<FeedbackCreate />}/> 
      </Routes>
    </div>
  </Router>
  );
}