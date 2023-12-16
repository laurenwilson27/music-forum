import Like from "./Like";

const Comment = ({ comment }) => {
  return (
    <div>
      <h3>{comment.text}</h3>
      <Like commentId={comment.id} />
    </div>
  );
};

export default Comment;
