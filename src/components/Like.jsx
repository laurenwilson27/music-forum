import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Like({ commentId }) {
  var [count, setCount] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`http://localhost:7000/comments/${commentId}`);
      const data = await res.json();
      setCount(data.likes ?? 0);
    };

    fetchLikes();
  }, [commentId]);

  const increment = async () => {
    var res = await fetch(`http://localhost:7000/comments/${commentId}`);
    var data = await res.json();
    data.likes = (data.likes ?? 0) + 1;

    res = await fetch(`http://localhost:7000/comments/${commentId}`, {
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
    var res = await fetch(`http://localhost:7000/comments/${commentId}`);
    var data = await res.json();
    data.likes = (data.likes ?? 0) - 1;

    res = await fetch(`http://localhost:7000/comments/${commentId}`, {
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
    <div>
      <p>Likes: {count}</p>
      <button
        onClick={() => {
          status === false ? increment() : decrement();
        }}
      >
        {status === false ? <FaThumbsUp /> : <FaThumbsDown />}
      </button>
    </div>
  );
}

export default Like;
