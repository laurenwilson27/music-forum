import { useNavigate, useLocation } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // This element appears on all pages, but should only render when not on the root page
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
  else return <div className="space-between-containers" />;
};

export default BackBtn;
