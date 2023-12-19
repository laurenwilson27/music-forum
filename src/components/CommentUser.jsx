const CommentUser = ({ name, avatar }) => {
  return (
    <td>
      <p>{name}</p>
      <img
        src={`/avatars/${avatar}`}
        alt="User avatar"
        width="96px"
        height="96px"
      />
    </td>
  );
};

export default CommentUser;
