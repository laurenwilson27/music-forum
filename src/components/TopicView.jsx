import AddCommentForm from "./AddCommentForm";

import useGet from "../hooks/useGet";
import { useParams } from "react-router-dom";

const TopicView = () => {
  // The Router in App.js passes a topicID parameter based on the page URL
  // The forumID parameter is used to apply a filter to the json-server request
  const params = useParams();
  const { data, isLoading, error, setData } = useGet(
    //This endpoint returns the details of a topic, plus every comment with a matching topicID
    `http://localhost:7000/topics/${params.topicID}?_embed=comments`
  );

  // Show placeholders if loading is in progress or has failed
  if (isLoading) return <div>Loading comments...</div>;
  if (error)
    return (
      <div>
        Error!
        <br />
        {error}
      </div>
    );

  // Function to add a comment; passed to the comment form
  const addComment = async (comment) => {
    // Create a timestamp for the following requests
    const now = new Date();

    // POST the new comment to the comments in the DB
    const res = await fetch("http://localhost:7000/comments", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        topicId: Number(params.topicID),
        text: comment,
        timestamp: now,
      }),
    });

    // Additionally, use PATCH to update the 'count' value for the topic
    await fetch(`http://localhost:7000/topics/${params.topicID}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ count: data.count + 1, timestamp: now }),
    });

    //The response is the new comment, append it to the existing comments and update comment count
    const resData = await res.json();
    setData({
      ...data,
      count: data.count + 1,
      comments: [...data.comments, resData],
    });
  };

  return (
    <div>
      Comments in: {data.title}
      <div>
        {data.comments.map((comment) => {
          return (
            <div className="comment" key={comment.id}>
              {comment.text}
            </div>
          );
        })}
      </div>
      {/* New Comments section */}
      <AddCommentForm onAdd={addComment} />
    </div>
  );
};

export default TopicView;
