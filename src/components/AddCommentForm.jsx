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
    <form className="add-comment" name="newCommentForm" onSubmit={onSubmit}>
      <label htmlFor="text">Comment:</label>
      <textarea
        id="text"
        type="text"
        placeholder="Add comment here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <input type="submit" value="Submit Comment"></input>
    </form>
  );
};

export default AddCommentForm;
