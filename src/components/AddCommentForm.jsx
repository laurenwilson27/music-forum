import { useState } from "react";

const AddCommentForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add comment text before submitting.");
      return;
    }

    onAdd(text);

    setText("");
  };

  return (
    <div className="container-addcomment">
      <form className="add-comment" name="newCommentForm" onSubmit={onSubmit}>
        <div className="comment-box">
          <h3 className="tableFont0 inputTitle">Add Comment</h3>
          <textarea
            id="text"
            type="text"
            className="comment-input"
            placeholder="Write your comment here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="btns-containerPost">
            <input className="comment-btn" type="submit" value="Post"></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm;
