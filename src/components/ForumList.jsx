import useGet from "../hooks/useGet";
import { Link } from "react-router-dom";

const ForumList = () => {
  const { data, isLoading, error } = useGet("http://localhost:7000/genres");

  // Show placeholders if loading is in progress or has failed
  if (isLoading) return <div>Loading forum listing...</div>;
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
      {data.map((genre) => {
        return (
          <div>
            Genre: {genre.name}
            <br />
            {genre.forums.map((forum) => {
              return <Link to={`forum/${forum.id}`}>{forum.name}</Link>;
            })}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default ForumList;
