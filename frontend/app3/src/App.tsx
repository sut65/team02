import * as React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import FictionInfo from "./components/fiction/FictionInfo";
import FictionInfoDetail from "./components/fiction/FictionInfoDetail";
import FeedbackCreate from "./components/feedback/FeedbackCreate";
import ReaderProfile from "./components/reader/ReaderProfile";
import ReviewTable from "./components/review/ReviewTable";
import TopUpTable from "./components/topup/TopUpTable";
import ReviewCreate from "./components/review/ReviewCreate";
import ShowFictions from "./components/fiction/ShowStory";
import Bookshelf from "./components/bookshelf/BookshelfCreate";
import ShowStory from "./components/fiction/ShowStory";
import ReviewUpdate from "./components/review/ReviewUpdate";
import FeedbackUpdate from "./components/feedback/FeedbackUpdate";
import FeedbackTable from "./components/feedback/FeedbackTable";
import ReaderCreate from "./components/reader/ReaderCreate";


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
        <Route path="/" element={<Home/>} /> 
        <Route path="/fictions" element={<FictionInfo  />} /> 
        <Route path="/fiction/:id" element={<FictionInfoDetail />} />
        {/* <Route path="/fictions-show" element={<ShowFictions  />} />  */}
        <Route path="/fiction/story/:id" element={<ShowStory />} />
        <Route path="/feedback-create/" element={<FeedbackCreate />}/>
        <Route path="/feedback-update/:id" element={<FeedbackUpdate/>}/>
        <Route path="/feedbacks" element={<FeedbackTable/>}/>
<<<<<<< HEAD
        <Route path="/reader-create" element={<ReaderProfile />}/>
=======
        <Route path="/reader-profile" element={<ReaderProfile />}/>
>>>>>>> 5c775d7b14a5add7a70b2fca562dc235f59811f5
        <Route path="/reviews" element={<ReviewTable/>}/>
        <Route path="/review/create/:id" element={<ReviewCreate/>}/>
        <Route path="/review/update/:id" element={<ReviewUpdate/>}/>
        <Route path="/top_ups" element={<TopUpTable/>}/>
        <Route path="/reader-create" element={<ReaderCreate/>}/>
        <Route path="/bookshelf_create" element={<Bookshelf/>}/>
      </Routes>
    </div>
  </Router>
  );
}