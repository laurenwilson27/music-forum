import { useLocation } from "react-router-dom";
import Button from "./Button";

const CommentButton = ({ title, onAdd, showAdd }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Comment"}
        onClick={onAdd}
      />
    </div>
  );
};

export default CommentButton;
