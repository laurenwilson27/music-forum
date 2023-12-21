import "./SPRINT2_Forum_styles.css";

import Header from "./components/Header";
import TopicList from "./components/TopicList";
import ForumList from "./components/ForumList";
import TopicView from "./components/TopicView";
import Register from "./components/Register";
import BackBtn from "./components/BackBtn";
import Footer from "./components/Footer";

import useSmoothScroll from "./hooks/useSmoothScroll.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [refTop, smoothScroll] = useSmoothScroll();

  return (
    <div className="App" ref={refTop}>
      <Router>
        <Header />
        <BackBtn />
        <main>
          {/* The main content is determined using the Router */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/forum/:forumID" element={<TopicList />} />
            <Route path="/topic/:topicID" element={<TopicView />} />
            <Route path="/" element={<ForumList />} />
          </Routes>
        </main>
        <Footer onClick={smoothScroll} />
      </Router>
    </div>
  );
}

export default App;
