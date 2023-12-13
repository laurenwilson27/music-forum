import "./App.css";

import Header from "./components/Header";
import TopicList from "./components/TopicList";
import GenreList from "./components/TopicList";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          {/* The main content is determined using the Router */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/genre/:genreID" element={<TopicList />} />
            <Route path="/topic/:topicID" />
            <Route path="/" element={<GenreList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
