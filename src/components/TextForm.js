import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faRedo } from "@fortawesome/free-solid-svg-icons";

export default function TextForm(props) {
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const handleOnChange = (event) => {
    setHistory((prev) => [...prev, text]); // previous text history me save
    setFuture([]); // future (redo) clear
    setText(event.target.value); // new text set
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const previous = history[history.length - 1];

    setFuture((prev) => [text, ...prev]); // current text future me
    setText(previous);
    setHistory(history.slice(0, history.length - 1));
  };
  const handleRedo = () => {
    if (future.length === 0) return;

    const next = future[0];

    setHistory((prev) => [...prev, text]); // current text history me
    setText(next);
    setFuture(future.slice(1));
  };

  const UpHandleClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Upper Case!", "success");
  };

  const LoHandleClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lower Case!", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    document.getSelection().removeAllRanges();
    props.showAlert("Copied to Clipboard!", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };

  const clrHandleClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("The Text area is cleared now.", "success");
  };

  // const handleOnChange = (event) => {
  //   setText(event.target.value);
  // };
  const boldText = () => {
    let textArea = document.getElementById("myBox");
    if (textArea.style.fontWeight === "bold") {
      textArea.style.fontWeight = "normal";
      props.showAlert("Text is Normal now.", "success");
    } else {
      textArea.style.fontWeight = "bold";
      props.showAlert("Text is Bold now.", "success");
    }
  };
  const [text, setText] = useState("");

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1 className="my-4">{props.heading}</h1>
        <div className="mb-3">
          <label htmlFor="myBox" className="form-label"></label>
          <textarea
            className="form-control"
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            id="myBox"
            onChange={handleOnChange}
            value={text}
            rows="8"
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1 "
          onClick={UpHandleClick}
        >
          Convert to UPPERCASE
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={LoHandleClick}
        >
          Convert to LOWERCASE
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={clrHandleClick}
        >
          Clear
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={boldText}
        >
          Bold
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleUndo}
          disabled={history.length === 0}
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleRedo}
          disabled={future.length === 0}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>

      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your text summary</h2>
        <p>
          '
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }
          ' words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h3>PREVIEW</h3>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
