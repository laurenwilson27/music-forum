import AddTopicForm from "./AddTopicForm";
import BackBtn from "./BackBtn";

import useGet from "../hooks/useGet";
import useUser from "../hooks/useUser";
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const TopicList = () => {
  const navigate = useNavigate();
  const [user] = useUser();

  // The Router in App.js passes a forumID parameter based on the page URL
  // The forumID parameter is used to apply a filter to the json-server request
  const params = useParams();
  const { data, isLoading, error } = useGet(
    `http://localhost:7000/forums/${params.forumID}?_sort=timestamp&_embed=topics`
  );

  // Show placeholders if loading is in progress or has failed
  if (isLoading) return <div>Loading topic listing...</div>;
  if (error)
    return (
      <div>
        Error!
        <br />
        {error}
      </div>
    );

  // Function to add a topic + first comment within it; passed to the topic form
  const addTopic = async (title, comment) => {
    // Create a timestamp for the following requests
    const now = moment().unix() * 1000;

    // POST the new topic to the DB topics
    const res = await fetch("http://localhost:7000/topics", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: title,
        forumId: Number(params.forumID),
        count: 1,
        timestamp: now,
      }),
    });

    //The response contains the new topic,
    const resData = await res.json();

    // Additionally, use PATCH to update the 'count' value for the forum
    await fetch(`http://localhost:7000/forums/${params.forumID}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ count: data.count + 1, timestamp: now }),
    });

    // Finally, also POST a new comment linked to the topic we've created
    const commentRes = await fetch("http://localhost:7000/comments", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        topicId: resData.id,
        text: comment,
        timestamp: now,
        likes: 1,
        userId: user.userId,
      }),
    });

    // Locally store that we've liked our own comment
    const commentData = await commentRes.json();
    localStorage.setItem(
      "likes",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("likes")),
        [commentData.id]: true,
      })
    );

    // Append the new topic to our local data
    // (Deprecated, we navigate to the new topic instead)
    // setData({
    //   ...data,
    //   count: data.count + 1,
    //   topics: [...data.topics, resData],
    // });

    // Navigate to the page for our newly created topic
    navigate(`/topic/${resData.id}`);
  };

  // Function used when sorting a list of topic objects by their timestamp
  const timeSort = (a, b) => {
    return b.timestamp - a.timestamp;
  };

  return (
    <div>
      <BackBtn label="Back to Home" to="/" />
      List of topics for {data.name}
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Comments</td>
            <td>Last Update</td>
          </tr>
        </thead>
        <tbody>
          {/* Data returned by the API is sorted by ID, sort topics by timestamp instead */}
          {data.topics.sort(timeSort).map((topic) => {
            return (
              <tr key={topic.id}>
                <td>
                  <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
                </td>
                <td>{topic.count}</td>
                <td>
                  {moment(topic.timestamp).format("MMM Do YYYY [@] hh:mm a")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {user.loggedIn && <AddTopicForm onAdd={addTopic} />}
    </div>
  );
};

export default TopicList;
