import { useState, useEffect } from "react";
import Comments from "./Comments";
import AddComments from "./AddComments";
import CommentButton from "./CommentButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Like from "./Like";

const CommentsPage = () => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const commentsFromServer = await fetchComments();
        setComments(commentsFromServer);
      } catch (error) {
        console.error("Error fetching COMMENTS:", error);
      }
    };

    getComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch("http://localhost:7000/comments");
    const data = await res.json();
    return data;
  };

  // const fetchComment = async (id) => {
  //   console.log("fetchComment: " + id);
  //   const res = await fetch(`http://localhost:7000/comments/${id}`);
  //   const data = await res.json();
  //   return data;
  // };

  const addComment = async (comment) => {
    console.log(comment);
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
        <div>
          <Comments comments={comments} />
          {/* {comments.map((comment) => (
            <Like key={comment.id} commentId={comment.id} />
          ))} */}
        </div>
      ) : (
        "No comments yet"
      )}
      <br></br>
      {showAddComment && <AddComments onAdd={addComment} />}
    </div>
  );
};

export default CommentsPage;
