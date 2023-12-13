import "./App.css";

import Header from "./components/Header";
import TopicList from "./components/TopicList";
import ForumList from "./components/ForumList";
import Register from "./components/Register";

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
