import { useState, useEffect, useRef } from "react";

import axios from "axios";

import "./Test.css";

import Button from "../Button/Button";

function Test() {
  const [axiosURL, setAxiosURL] = useState([]);
  const [questNumber, setQuestNumber] = useState(1);
  const [question, setQuestion] = useState([]);
  const [answerMode, setAnswerMode] = useState([]);

  let mode;
  let getAnswer;
  let useAnswer = useRef([0, 0, 0, 0]);

  useEffect(() => {
    if (axiosURL.length === 0) {
      axios
        .post("php/Test.php")
        .then(function (response) {
          setAxiosURL(response.request.responseURL);
          return;
        })
        .catch(function () {
          setAxiosURL("http://hw1.box/Test.php");
          return;
        });
    } else {
      axios
        .post(axiosURL, {
          Number: questNumber,
        })
        .then(function (response) {
          mode = response.data.mode;
          getAnswer = response.data.answers;

          getHTML(mode, getAnswer);

          setQuestNumber(questNumber + 1);
          setQuestion(response.data);
        });
    }
  }, [axiosURL]);

  function send() {
    if (document.getElementById("1") !== null) {
      document.getElementById("1").checked = false;
      document.getElementById("2").checked = false;
      document.getElementById("3").checked = false;
      document.getElementById("4").checked = false;
    }
    
    axios
      .post(axiosURL, {
        Number: questNumber,
        Answer: useAnswer.current,
      })
      .then(function (response) {
        setQuestNumber(questNumber + 1);

        mode = response.data.mode;
        getAnswer = response.data.answers;
        useAnswer.current = [0, 0, 0, 0];

        getHTML(mode, getAnswer);

        setQuestion(response.data);
      });
  }

  function getHTML(mode, getAnswer) {
    if (mode === "deployed") {
      setAnswerMode(
        <div className="TestInputs">
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
      );
    } else if (mode === "more") {
      let id = 0;

      setAnswerMode(
        getAnswer.map((f) => {
          id++;

          return (
            <div className="TestInputs">
              <input
                type="checkbox"
                name="more"
                id={id}
                onChange={(event) => {
                  writeAnswers(event.target.id, event.target.checked);
                }}
              />
              <label htmlFor={id}>{f}</label>
            </div>
          );
        })
      );
    } else if (mode === "one") {
      let id = 0;

      setAnswerMode(
        getAnswer.map((f) => {
          id++;

          return (
            <div className="TestInputs">
              <input
                type="radio"
                name="one"
                id={id}
                onChange={(event) => {
                  writeAnswers(event.target.id, event.target.checked);
                }}
              />
              <label htmlFor={id}>{f}</label>
            </div>
          );
        })
      );
    } else {
      setAnswerMode(<div></div>);
    }
  }

  function writeAnswers(id, state) {
    state = state ? 1 : 0;
    if (mode === "one") {
      useAnswer.current = [0, 0, 0, 0];
      useAnswer.current[id - 1] = state;
    } else if (mode === "more") {
      useAnswer.current[id - 1] = state;
    }
  }

  return (
    <div className="TestWrapper">
      <div className="TestForm">
        <form
          name="Test"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          {"rightAnswers" in question ? (
            <div className="TestResult">
              <h2>
                ????????????????????, ???????????????????? ??????????????: {question.rightAnswers} ???? 2!
              </h2>
            </div>
          ) : (
            <div className="TestResult">
              <h2>{question.text}</h2>
            </div>
          )}
          {answerMode}
          {"rightAnswers" in question ? (
            <div>
              <div></div>
            </div>
          ) : (
            <Button text="??????????" type="submit" state={() => {}} />
          )}
        </form>
      </div>
    </div>
  );
}

export default Test;
