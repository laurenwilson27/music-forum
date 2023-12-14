import useGet from "../hooks/useGet";
import { Link, useParams } from "react-router-dom";

const TopicList = () => {
  // The Router in App.js passes a forumID parameter based on the page URL
  // The forumID parameter is used to apply a filter to the json-server request
  const params = useParams();
  const { data, isLoading, error } = useGet(
    `http://localhost:7000/topics?forum=${params.forumID}`
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

  return (
    <div>
      <ul>
        {data.map((topic) => {
          return (
            <li key={topic.id}>
              <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopicList;
