import { useState } from "react";

const AddTopicForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add a description of your topic before submitting.");
      return;
    }

    if (!title) {
      alert("Please add a topic title before submitting.");
      return;
    }

    onAdd(title, text);

    setText("");
    setTitle("");
  };

  return (
    <form className="add-comment" onSubmit={onSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        placeholder="Enter topic title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="text">Comment:</label>
      <textarea
        id="text"
        type="text"
        placeholder="Enter topic description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <input type="submit" value="Create Topic"></input>
    </form>
  );
};

export default AddTopicForm;
