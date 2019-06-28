import React, { useState } from "react";
import ReactQuill from "react-quill";

import "./AddIssue.scss";

function AddIssue() {
  const [volume, setVolume] = useState(1);
  const [issue, setIssue] = useState(1);
  const [articles, setArticles] = useState([]);

  function addArticle() {
    setArticles([...articles, { title: "", author: "", body: "" }]);
  }

  function editArticle(index, newData) {
    setArticles([...articles.slice(0, index), newData, ...articles.slice(index + 1)]);
  }

  return (
    <div className="add-issue">
      <div className="title">
        Volume <TitleInput value={volume} onChange={e => setVolume(e.currentTarget.value)} /> Issue{" "}
        <TitleInput value={issue} onChange={e => setIssue(e.currentTarget.value)} />
      </div>
      {articles.map(({ title, author, body }, index) => (
        <ArticleForm
          key={index}
          title={title}
          author={author}
          body={body}
          onChange={data => editArticle(index, data)}
        />
      ))}
      <AddButton onClick={addArticle} />
    </div>
  );
}

function TitleInput(props) {
  return (
    <input
      onFocus={({ currentTarget: e }) => {
        e.placeholder = e.value;
        e.value = null;
      }}
      onBlur={({ currentTarget: e }) => (e.value = e.value || e.placeholder)}
      {...props}
    />
  );
}

const quillOptions = {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"]
    ]
  },

  formats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ]
};

function ArticleForm(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  function updateState() {
    console.log({ title, author, body })
    props.onChange({ title, author, body });
  }

  return (
    <div className="new-article">
      <input
        className="title"
        placeholder="Article Name"
        onChange={e => {
          setTitle(e.currentTarget.value);
          updateState();
        }}
      />
      <input
        className="author"
        placeholder="By"
        onChange={e => {
          setAuthor(e.currentTarget.value);
          updateState();
        }}
      />
      <ReactQuill
        className="body"
        placeholder="Article Content"
        formats={quillOptions.formats}
        modules={quillOptions.modules}
        onChange={e => {
          setBody(e);
          updateState();
        }}
      />
    </div>
  );
}

function AddButton(props) {
  return (
    <div className="add-button" {...props}>
      Add Article
    </div>
  );
}

export default AddIssue;