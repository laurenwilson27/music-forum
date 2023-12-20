import "./SPRINT2_Forum_styles.css";

import Header from "./components/Header";
import TopicList from "./components/TopicList";
import ForumList from "./components/ForumList";
import TopicView from "./components/TopicView";
import Register from "./components/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <div className="container">
            {/* The main content is determined using the Router */}
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/forum/:forumID" element={<TopicList />} />
              <Route path="/topic/:topicID" element={<TopicView />} />
              <Route path="/" element={<ForumList />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
