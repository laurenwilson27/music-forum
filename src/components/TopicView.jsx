import AddCommentForm from "./AddCommentForm";
import CommentLikes from "./CommentLikes";
import CommentUser from "./CommentUser";

import useGet from "../hooks/useGet";
import useUser from "../hooks/useUser";
import { useParams } from "react-router-dom";
import { useState } from "react";

// Using tbe moment.js package - outdated, but simple
import moment from "moment";
import BackBtn from "./BackBtn";

const TopicView = () => {
  // The Router in App.js passes a topicID parameter based on the page URL
  // The topicID parameter is used to apply a filter to the json-server request
  const params = useParams();
  const { data, isLoading, error, setData } = useGet(
    //This endpoint returns the details of a topic, plus every comment with a matching topicID
    `http://localhost:7000/topics/${params.topicID}?_embed=comments`
  );
  const [users, setUsers] = useState({});
  const [user] = useUser();

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

  // At this point in the function, it can be assumed that the data is loaded
  // Individually fetch the information for each unique user in the comments

  // (I really don't like this approach but it was the best I could come up with)
  data.comments.forEach((comment) => {
    if (!(comment.userId in users)) {
      // These fetches are *synchronous* - page load time will increase with number of unique users in comments
      fetch(`http://localhost:7000/users/${comment.userId}`)
        .then((response) => {
          return response.json();
        })
        .then((user) => {
          setUsers({
            ...users,
            [comment.userId]: {
              name: user.name,
              avatar: user.avatar,
            },
          });
        });
    }
  });

  // Function to add a comment; passed to the comment form
  const addComment = async (comment) => {
    // Create a timestamp for the following requests
    const now = moment().unix() * 1000;

    // POST the new comment to the comments in the DB
    const res = await fetch("http://localhost:7000/comments", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        topicId: Number(params.topicID),
        text: comment,
        timestamp: now,
        likes: 1,
        userId: user.userId,
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

    // Set the new comment as being already 'liked' by the user in local storage
    localStorage.setItem(
      "likes",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("likes")),
        [resData.id]: true,
      })
    );
  };

  return (
    <div>
      <BackBtn label="Back to Forum" to={`/forum/${data.forumId}`} />
      Comments in: {data.title}
      <table>
        <tbody>
          {data.comments.map((comment) => {
            return (
              <tr className="comment" key={comment.id}>
                {comment.userId in users && (
                  <CommentUser
                    name={users[comment.userId].name}
                    avatar={users[comment.userId].avatar}
                  />
                )}
                <td>{comment.text}</td>
                <CommentLikes comment={comment} />
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* New Comments section */}
      {user.loggedIn && <AddCommentForm onAdd={addComment} />}
    </div>
  );
};

export default TopicView;
