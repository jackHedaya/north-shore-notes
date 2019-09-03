import React, { useState } from "react";

import Scroll from "react-scrollchor";
import ReactQuill from "react-quill";

import { GoX } from "react-icons/go";

import "./AddIssue.scss";

const quickId = () => Math.random().toString();

function AddIssue() {
  const BLANK_ARTICLE = () => ({ title: "", author: "", body: "", id: quickId() });

  const [volume, setVolume] = useState(1);
  const [issue, setIssue] = useState(1);
  const [articles, setArticles] = useState([BLANK_ARTICLE()]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function showError() {
    setIsError(true);
    setTimeout(function() {
      setIsError(false);
    }, 3000);
  }

  function addArticle() {
    setArticles([...articles, BLANK_ARTICLE()]);
  }

  function editArticle(index, newData) {
    setArticles([...articles.slice(0, index), { ...articles[index], ...newData }, ...articles.slice(index + 1)]);
  }

  function deleteArticle(index) {
    setArticles([...articles.slice(0, index), ...articles.slice(index + 1)]);
  }

  function submitIssue() {
    setIsLoading(true);
    setIsError(false);

    fetch("/issue", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ volume, issue, articles })
    })
      .then(resp => {
        if (resp.ok) setIsError(false);
        else showError();
      })
      .catch(_ => showError())
      .finally(_ => setIsLoading(false));
  }

  return (
    <div className="add-issue">
      <div className="title">
        Volume <TitleInput value={volume || ""} updateState={x => setVolume(x)} /> Issue{" "}
        <TitleInput value={issue || ""} updateState={x => setIssue(x)} />
      </div>
      <Outline articles={articles} />
      <Submit send={submitIssue} loading={isLoading} error={isError} />
      {articles.map(({ title, author, body, id }, index) => (
        <ArticleForm
          key={id}
          id={id}
          title={title}
          author={author}
          body={body}
          onChange={data => editArticle(index, data)}
          deleteSelf={_ => deleteArticle(index)}
          break={index !== articles.length - 1}
        />
      ))}
      <AddButton onClick={addArticle} />
    </div>
  );
}

function Outline(props) {
  return (
    <div className="outline">
      <div className="title">Outline</div>
      <div className="break" />
      {props.articles.map(({ title, id }) => (
        <Scroll to={`#${id}`} key={`_#${id}`} animate={{ offset: -100, duration: 400 }}>
          {title}
        </Scroll>
      ))}
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
      onChange={e => props.updateState(!e.currentTarget.value ? null : parseInt(e.currentTarget.value))}
      onKeyDown={e => (isNaN(parseInt(e.currentTarget.value + e.key)) && e.keyCode !== 8 ? e.preventDefault() : null)}
      value={props.value}
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
  return (
    <div className="new-article" id={props.id}>
      <input
        className="title"
        placeholder="Article Name"
        onChange={e => props.onChange({ title: e.currentTarget.value })}
        value={props.title}
      />
      <div className="delete-wrapper">
        <GoX className="delete" onClick={props.deleteSelf} />
      </div>
      <input
        className="author"
        placeholder="By"
        onChange={e => props.onChange({ author: e.currentTarget.value })}
        value={props.author}
      />
      <ReactQuill
        className="body"
        placeholder="Article Content"
        formats={quillOptions.formats}
        modules={quillOptions.modules}
        onChange={e => props.onChange({ body: e })}
        value={props.body}
      />
      {props.break && <div className="break" />}
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

function Submit(props) {
  return (
    <div
      className="submit"
      onClick={!props.loading && props.send}
      style={{
        width: props.loading ? "30px" : undefined,
        backgroundColor: props.error ? "red" : undefined,
        textIndent: props.loading ? 30 : undefined
      }}
    >
      Upload
    </div>
  );
}

export default AddIssue;
