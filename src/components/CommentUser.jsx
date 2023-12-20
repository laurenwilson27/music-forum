const CommentUser = ({ name, avatar }) => {
  return (
    <div className="user-content1">
      <img src={`/avatars/${avatar}`} alt="User avatar" />
      <div className="user-title">{name}</div>
    </div>
  );
};

export default CommentUser;
