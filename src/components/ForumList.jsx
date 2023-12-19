import useGet from "../hooks/useGet";
import { Link } from "react-router-dom";

// We use a Fragment with a 'key' value, which cannot be done with the <> shorthand
import { Fragment } from "react";

const ForumList = () => {
  const { data, isLoading, error } = useGet(
    "http://localhost:7000/genres?_embed=forums"
  );

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
      <table>
        <thead>
          <tr>
            <td>Forum</td>
            <td>Topics</td>
          </tr>
        </thead>
        <tbody>
          {/* The API data contains a list of genres to iterate through */}
          {data.map((genre) => {
            return (
              <Fragment key={genre.id}>
                <tr>
                  <td colSpan="3">Genre: {genre.name}</td>
                </tr>
                {/* Each genre also contains a list of forums to list within that genre */}
                {genre.forums.map((forum) => {
                  return (
                    <tr key={forum.id}>
                      <td>
                        <Link to={`forum/${forum.id}`} key={forum.id}>
                          {forum.name}
                          <br />
                          {forum.desc}
                          <br />
                        </Link>
                      </td>
                      <td>{forum.count}</td>
                    </tr>
                  );
                })}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ForumList;
