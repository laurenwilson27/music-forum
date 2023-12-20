import { useNavigate, useLocation } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== "/")
    return (
      <div className="breadcrumb">
        <span
          className="backLink"
          onClick={() => {
            navigate(-1);
          }}
        >
          {"< Back"}
        </span>
      </div>
    );
};

export default BackBtn;
