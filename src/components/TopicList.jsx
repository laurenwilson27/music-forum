import AddTopicForm from "./AddTopicForm";

import useGet from "../hooks/useGet";
import { Link, useParams, useNavigate } from "react-router-dom";

const TopicList = () => {
  const navigate = useNavigate();

  // The Router in App.js passes a forumID parameter based on the page URL
  // The forumID parameter is used to apply a filter to the json-server request
  const params = useParams();
  const { data, isLoading, error } = useGet(
    `http://localhost:7000/forums/${params.forumID}?_embed=topics`
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
    const now = new Date();

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
    await fetch("http://localhost:7000/comments", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ topicId: resData.id, text: comment }),
      timestamp: now,
    });

    // Append the new topic to our local data
    // (Commented out, we navigate to the new topic instead)
    // setData({
    //   ...data,
    //   count: data.count + 1,
    //   topics: [...data.topics, resData],
    // });

    // Navigate to the page for our newly created topic
    navigate(`/topic/${resData.id}`);
  };

  return (
    <div>
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
          {data.topics.map((topic) => {
            return (
              <tr key={topic.id}>
                <td>
                  <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
                </td>
                <td>{topic.count}</td>
                <td>{topic.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <AddTopicForm onAdd={addTopic} />
    </div>
  );
};

export default TopicList;
