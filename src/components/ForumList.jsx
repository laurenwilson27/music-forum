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
          <div key={genre.id}>
            Genre: {genre.name}
            <br />
            {genre.forums.map((forum) => {
              return (
                <Link to={`forum/${forum.id}`} key={forum.id}>
                  {forum.name}
                  <br />
                </Link>
              );
            })}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default ForumList;
