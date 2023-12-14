import useGet from "../hooks/useGet";
import { Link, useParams } from "react-router-dom";

const TopicList = (forumID) => {
  const params = useParams();
  console.log(params);
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
          return <li>{topic.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default TopicList;
