import { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import useLikes from "../hooks/useLikes";

const CommentLikes = ({ comment }) => {
  const [count, setCount] = useState(comment.likes ?? 0);

  // Status refers to if the user has liked the comment
  const [status, setStatus] = useLikes(comment.id);

  const increment = async () => {
    // Fetch an updated 'like' count for this comment, and increment it
    var res = await fetch(`http://localhost:7000/comments/${comment.id}`);
    var data = await res.json();
    data.likes = (data.likes ?? 0) + 1;

    // Use PUT to update the like count in the database
    res = await fetch(`http://localhost:7000/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const updatedCount = await res.json();

    setCount(updatedCount.likes);
    setStatus(true);
  };

  const decrement = async () => {
    // Fetch an updated 'like' count for this comment, and decrement it
    var res = await fetch(`http://localhost:7000/comments/${comment.id}`);
    var data = await res.json();
    data.likes = (data.likes ?? 0) - 1;

    // Use PUT to update the like count in the database
    res = await fetch(`http://localhost:7000/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const updatedCount = await res.json();

    setCount(updatedCount.likes);
    setStatus(false);
  };

  return (
    <td>
      <span className="tableFont1 likeCount">{count}</span>
      <br />
      <span
        className="likeButton"
        onClick={() => {
          status === false ? increment() : decrement();
        }}
        title={status === false ? "Like" : "Dislike"}
      >
        {status === false ? (
          <FaRegThumbsUp style={{ color: "#deccff" }} />
        ) : (
          <FaThumbsUp style={{ color: "#4f4" }} />
        )}
      </span>
    </td>
  );
};

export default CommentLikes;
