import useGet from "../hooks/useGet";
import { Link, useParams } from "react-router-dom";

const TopicView = () => {
  // The Router in App.js passes a topicID parameter based on the page URL
  // The forumID parameter is used to apply a filter to the json-server request
  const params = useParams();
  const { data, isLoading, error } = useGet(
    `http://localhost:7000/comments?topic=${params.topicID}`
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

  return (
    <div>
      Comments in this topic:
      <div>
        {data.map((comment) => {
          return (
            <div className="comment" key={comment.id}>
              {comment.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopicView;
