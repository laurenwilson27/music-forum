import { useState, useEffect } from "react";
import Comments from "./Comments";
import AddComments from "./AddComments";
import CommentButton from "./CommentButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const CommentsPage = () => {
  useEffect(() => {
    const getComments = async () => {
      const commentsFromServer = await fetchComments();
      setComments(commentsFromServer);
    };

    getComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch("http://localhost:7000/comments");
    const data = await res.json();
    return data;
  };

  const fetchComment = async (id) => {
    const res = await fetch(`http://localhost:7000/comments/${id}`);
    const data = await res.json();
    return data;
  };

  const [showAddComment, setShowAddComment] = useState(false);
  const [comments, setComments] = useState([]);

  const addComment = async (comment) => {
    const res = await fetch("http://localhost:7000/comments", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(comment),
    });

    const data = await res.json();
    setComments([...comments, data]);
  };
  return (
    <div>
      <CommentButton
        onAdd={() => setShowAddComment(!showAddComment)}
        showAdd={showAddComment}
      />

      {comments.length > 0 ? (
        <Comments comments={comments} />
      ) : (
        "No comments yet"
      )}
      {showAddComment && <AddComments onAdd={addComment} />}
    </div>
  );
};

export default CommentsPage;
