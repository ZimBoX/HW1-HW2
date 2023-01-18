import { useState, useEffect, useRef } from "react";

import axios from "axios";

import "./CreateBlock.css";

import Button from "../Button/Button";

function CreateBlock() {
  const [axiosURL, setAxiosURL] = useState([]);
  const [result, setResult] = useState([]);

  let background_color = useRef();
  let color = useRef();
  let width = useRef();
  let height = useRef();

  useEffect(() => {
    if (axiosURL.length === 0) {
      axios
        .post("php/CreateBlock.php")
        .then(function (response) {
          setAxiosURL(response.request.responseURL);
          return;
        })
        .catch(function () {
          setAxiosURL("http://hw1.box/CreateBlock.php");
          return;
        });
    }
  }, [axiosURL]);

  function send() {

    let userbackground_color = background_color.current.value;
    let usercolor = color.current.value;
    let userwidth = width.current.value;
    let userheight = height.current.value;

    if (userbackground_color === "" 
    ||  usercolor === "" 
    ||  userwidth === "" 
    ||  userheight === "") 
    {
        if (userbackground_color === "")background_color.current.className = "inputEror";
        if (usercolor === "")color.current.className = "inputEror";
        if (userwidth === "")width.current.className = "inputEror";
        if (userheight === "")height.current.className = "inputEror";
    } else {
      color.current.className = "";
      background_color.current.className = "";
      width.current.className = "";
      height.current.className = "";
      axios
        .post(axiosURL, {
          background_color: userbackground_color,
          color: usercolor,
          width: userwidth,
          height: userheight
        })
        .then(function (response) {
          setResult(response.data);
        });
    }
  }

  return (
    <div className="CreateBlockWrapper">
      <div className="CreateBlockForm">
        <form
          name="CreateBlock"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <input type="text" ref={background_color} placeholder="background_color red|#123456" />
          <input type="text" ref={color} placeholder="color red|#123456" />
          <input type="text" ref={width} placeholder="width 123px|123%..." />
          <input type="text" ref={height} placeholder="height 123px|123%..." />
          <div className="CreateBlockButton">
            <Button text="Отправить" type="submit" state={() => {}} />
          </div>
        </form>
      </div>

      <div className="CreateBlockResult">
        <div dangerouslySetInnerHTML={{ __html: result }}></div>
      </div>
    </div>
  );
}

export default CreateBlock;
