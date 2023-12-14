import "./App.css";

import Header from "./components/Header";
import TopicList from "./components/TopicList";
import ForumList from "./components/ForumList";
import Register from "./components/Register";

import CommentsPage from "./components/CommentsPage";
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          {/* The main content is determined using the Router */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/forum/:forumID" element={<TopicList />} />
            <Route path="/topic/:topicID" />
            <Route path="/" element={<ForumList />} />

            <Route path="/commentspage" element={<CommentsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
