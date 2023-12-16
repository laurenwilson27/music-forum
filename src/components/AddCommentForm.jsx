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
    <form className="add-comment" onSubmit={onSubmit}>
      <label>Comment:</label>
      <textarea
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
