// Note - this element currently just displays a link to the registration page to test the Router
import { Link } from "react-router-dom";

const GenreList = () => {
  return (
    <div>
      GenreList
      <br />
      <Link to="/register">Click here to register an account</Link>
    </div>
  );
};

export default GenreList;
