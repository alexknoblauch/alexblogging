import { useState } from "react";

export default function NewPostModal({ setPostModal }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


  async function handleNewPost(e) {
    if (!title || !text) {
      return;
    }

    const res = await fetch('http://localhost/alex_blogging_refacture/newPost.php', {
        method: "POST",
         credentials: "include", // Ensure the session cookie is sent
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          text: text,
        }),
    })

        if (!res.ok) {
        throw new Error("Network response was not ok");
        }

    setPostModal(false);
  }

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal-content-newpost">
        <div>
          <h1>+ New Post +</h1>
          <label htmlFor="title"></label>
          <input
            value={title}
            id="title"
            type="title"
            placeholder="Titel"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <label htmlFor="text"></label>
          <textarea
            className="new-post-textarea"
            value={text}
            type="text"
            id="text"
            placeholder="your Text"
            onChange={(e) => setText(e.target.value)}
          />
          <br></br>
          <button onClick={handleNewPost} className="sign-in-button-modal">
            Post
          </button>
        </div>
      </div>
    </>
  );
}
