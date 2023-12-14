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
      {/* The API data contains a list of genres to iterate through */}
      {data.map((genre) => {
        return (
          <div key={genre.id}>
            Genre: {genre.name}
            <br />
            {/* Each genre also contains a list of forums to list within that genre */}
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
