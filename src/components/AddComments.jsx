import { useState } from "react";

const AddComments = ({ onAdd }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add a task");
      return;
    }

    onAdd({ text });

    setText("");
  };

  return (
    <form className="add-comment" onSubmit={onSubmit}>
      <label>Comment:</label>
      <input
        type="text"
        placeholder="Add comment here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <input type="submit" value="Upload Comment"></input>
    </form>
  );
};

export default AddComments;
