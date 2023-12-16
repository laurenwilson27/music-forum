import { useState, useEffect } from "react";

function Like({ commentId }) {
  var [count, setCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const res = await fetch(`http://localhost:7000/comments/${commentId}`);
      const data = await res.json();
      count = data.likes ?? 0;
      setCount(count);
      console.log("count = " + count);
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
    // console.log("updated count = ", updatedCount);

    setCount(updatedCount.likes);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>id: {commentId}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Like;
