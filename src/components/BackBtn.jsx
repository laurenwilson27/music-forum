import { Link } from "react-router-dom";

const BackBtn = ({ to, label }) => {
  return (
    <div className="back">
      <Link to={to}>{`< ${label}`}</Link>
    </div>
  );
};

export default BackBtn;
