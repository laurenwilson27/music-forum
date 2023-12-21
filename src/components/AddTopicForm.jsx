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
    <div className="container-addcomment">
      <form className="add-comment" onSubmit={onSubmit}>
        <div className="comment-box">
          <h3 className="tableFont0 inputTitle">Add New Topic</h3>
          <input
            className="title-input"
            id="title"
            type="text"
            placeholder="Enter topic title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h3 className="tableFont0 inputTitle">Comment</h3>
          <textarea
            className="comment-input"
            id="text"
            type="text"
            placeholder="Enter topic description"
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

export default AddTopicForm;
