import useGet from "../hooks/useGet";
import { Link } from "react-router-dom";

const ForumList = () => {
  const { data, isLoading, error } = useGet(
    "http://localhost:7000/genres?_embed=forums"
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

  return (
    <div className="container">
      <div className="tablecontainer">
        {/* The API data contains a list of genres to iterate through */}
        {data.map((genre) => {
          return (
            <table key={genre.id} id={genre.name} className="genreTable">
              <thead>
                <tr className="header-row">
                  <th className="title-cell-title" colSpan="2">
                    <span className="tableFont0">
                      {genre.name.toUpperCase()}
                    </span>
                  </th>
                  <td className="title-cell" colSpan="1" width="100">
                    <span className="tableFont1">
                      # of
                      <br />
                      Topics
                    </span>
                  </td>
                </tr>
              </thead>
              <tbody>
                {/* Each genre also contains a list of forums to list within that genre */}
                {genre.forums.map((forum) => {
                  return (
                    <tr key={forum.id}>
                      <td colSpan="2" style={{ textAlign: "left" }}>
                        <span className="tableIcon1">
                          <i
                            className={forum.icon}
                            style={{ color: "#deccff" }}
                          />
                        </span>
                        <Link
                          className="tableFont2"
                          to={`forum/${forum.id}`}
                          key={forum.id}
                        >
                          {forum.name}
                        </Link>
                        <br />
                        <span className="tableFont3" style={{ margin: "0px" }}>
                          {forum.desc}
                        </span>
                      </td>
                      <td colSpan="1" width="100">
                        <span className="tableFont2">Topics</span>
                        <br />
                        {forum.count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
};

export default ForumList;
