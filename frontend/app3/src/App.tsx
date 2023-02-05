import * as React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import FictionInfo from "./components/fiction/FictionInfo";
import FictionInfoDetail from "./components/fiction/FictionInfoDetail";
import { useParams } from "react-router-dom";
import { WriterInterface } from "./interfaces/writer/IWriter";
import FeedbackCreate from "./components/feedback/FeedbackCreate";
import ReaderProfile from "./components/reader/ReaderProfile";
import ReviewTable from "./components/review/ReviewTable";
import TopUpTable from "./components/topup/TopUpTable";
import ReviewCreate from "./components/review/ReviewCreate";
import ShowFictions from "./components/fiction/ShowStory";
import Bookshelf from "./components/bookshelf/BookshelfCreate";
<<<<<<< HEAD
//import ReviewUpdate from "./components/review/ReviewUpdate";
=======
import ReviewUpdate from "./components/review/ReviewUpdate";
import ShowStory from "./components/fiction/ShowStory";
>>>>>>> 7affa923e2ba8a94fcffc8b0a72e36f4498ad276


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
        <Route path="/fiction/:id" element={<FictionInfoDetail />} />
        <Route path="/fictions-show" element={<ShowFictions  />} /> 
        <Route path="/fiction/story/:id" element={<ShowStory />} />
        <Route path="/feedback-create" element={<FeedbackCreate />}/> 
        <Route path="/reader-create" element={<ReaderProfile />}/>
        <Route path="/reviews" element={<ReviewTable/>}/>
<<<<<<< HEAD
        <Route path="/review/create" element={<ReviewCreate/>}/>
        {/* <Route path="/review/update/:id" element={<ReviewUpdate/>}/> */}
=======
        <Route path="/review/create/:id" element={<ReviewCreate/>}/>
        <Route path="/review/update/:id" element={<ReviewUpdate/>}/>
>>>>>>> 7affa923e2ba8a94fcffc8b0a72e36f4498ad276
        <Route path="/top_ups" element={<TopUpTable/>}/>
        <Route path="/reader-create" element={<ReviewCreate/>}/>
        <Route path="/bookshelf_create" element={<Bookshelf/>}/>
      </Routes>
    </div>
  </Router>
  );
}