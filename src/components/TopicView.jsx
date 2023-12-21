import AddCommentForm from "./AddCommentForm";
import CommentLikes from "./CommentLikes";
import CommentUser from "./CommentUser";

import useGet from "../hooks/useGet";
import useUser from "../hooks/useUser";
import { useParams } from "react-router-dom";
import { useState } from "react";

// Using tbe moment.js package - outdated, but simple
import moment from "moment";

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
  if (isLoading) return <></>;
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

    // Additionally, use PATCH to update the 'count', 'updateName', and 'timestamp' values for the topic
    await fetch(`http://localhost:7000/topics/${params.topicID}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        count: data.count + 1,
        updateName: user.userName,
        timestamp: now,
      }),
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
    <div className="container threadcontainer">
      <table>
        <thead>
          <tr className="header-row">
            <td className="title-cell" colSpan="1">
              <span className="tableFont1">User Info</span>
            </td>
            <td className="title-cell" colSpan="2">
              <span className="tableFont1">{data.title}</span>
            </td>
            <td className="title-cell" colSpan="1">
              <div className="tableFont1">Post Date</div>
            </td>
            <td className="title-cell" colSpan="1">
              <span className="tableFont1">Likes</span>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.comments.map((comment) => {
            return (
              <tr key={comment.id}>
                <td colSpan="1">
                  {comment.userId in users && (
                    <CommentUser
                      name={users[comment.userId].name}
                      avatar={users[comment.userId].avatar}
                    />
                  )}
                </td>
                <td
                  className="comment-td"
                  colSpan="2"
                  style={{ textAlign: "left" }}
                >
                  <span className="tableFont3 user-comment1">
                    {comment.text}
                  </span>
                </td>
                <td colSpan="1" width="120px">
                  {moment(comment.timestamp).format("MMM Do YYYY [@] hh:mm a")}
                </td>
                <CommentLikes comment={comment} />
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="space-between-containers" />
      {/* New Comments section */}
      {user.loggedIn && <AddCommentForm onAdd={addComment} />}
    </div>
  );
};

export default TopicView;
