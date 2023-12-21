import AddTopicForm from "./AddTopicForm";

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
  if (isLoading) return <></>;
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
        updateName: user.userName,
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
    <div className="container threadcontainer">
      <table>
        <thead>
          <tr className="header-row">
            <th className="title-cell-title" colSpan="2">
              <span className="tableFont0">{data.name}</span>
            </th>
            <th className="title-cell" colSpan="1" width="100">
              <span className="tableFont1">
                # of
                <br />
                Posts
              </span>
            </th>
            <th className="title-cell" colSpan="1" width="240">
              <span className="tableFont1">Last Update</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Data returned by the API is sorted by ID, sort topics by timestamp instead */}
          {data.topics.length > 0 ? (
            data.topics.sort(timeSort).map((topic) => {
              return (
                <tr key={topic.id}>
                  <td
                    colSpan="2"
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <span className="tableIcon1">
                      <i
                        className="fa-solid fa-crow"
                        style={{ color: "#deccff" }}
                      />
                    </span>
                    <Link
                      className="tableFont2 TopicBtn boardBtn"
                      style={{ verticalAlign: "middle" }}
                      to={`/topic/${topic.id}`}
                    >
                      {topic.title}
                    </Link>
                  </td>
                  <td colSpan="1" width="100">
                    <span className="tableFont2">Posts</span>
                    <br />
                    {topic.count}
                  </td>
                  <td colSpan="1" width="240">
                    <span className="tableFont2">By: {topic.updateName}</span>
                    <br />
                    {moment(topic.timestamp).format("MMM Do YYYY [@] hh:mm a")}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">
                <span className="tableFont2 TopicBtn boardBtn">
                  There are no topics in this forum. Consider creating one!
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="space-between-containers" />
      {user.loggedIn && <AddTopicForm onAdd={addTopic} />}
    </div>
  );
};

export default TopicList;
