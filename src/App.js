import "./App.css";
import { InputWrapper, TextInput, Container, Button } from "@mantine/core";
import { useState } from "react";

const words = require("./vertopal.com_words.json");

const wordArr = JSON.stringify(words).split("\\");

for (let i = 0; i < wordArr.length; i++) {
  wordArr[i] = wordArr[i].slice(1, 6);
}

export default function App() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState("");
  let data = "";
  let finalArr = [];

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (value.length > 5) {
      alert("Input is too long, max 5 characters");
    } else {
      if (value.indexOf("*") === -1) {
        //NOTE guess array
        const guessArr = value.split("");

        switch (guessArr.length) {
          case 1:
            for (let i = 0; i < wordArr.length; i++) {
              if (wordArr[i].indexOf(guessArr[0]) > -1) {
                finalArr.push(wordArr[i]);
              }
            }
            break;
          case 2:
            for (let i = 0; i < wordArr.length; i++) {
              if (
                wordArr[i].indexOf(guessArr[0]) > -1 &&
                wordArr[i].indexOf(guessArr[1]) > -1
              ) {
                finalArr.push(wordArr[i]);
              }
            }
            break;
          case 3:
            for (let i = 0; i < wordArr.length; i++) {
              if (
                wordArr[i].indexOf(guessArr[0]) > -1 &&
                wordArr[i].indexOf(guessArr[1]) > -1 &&
                wordArr[i].indexOf(guessArr[2]) > -1
              ) {
                finalArr.push(wordArr[i]);
              }
            }
            break;
          case 4:
            for (let i = 0; i < wordArr.length; i++) {
              if (
                wordArr[i].indexOf(guessArr[0]) > -1 &&
                wordArr[i].indexOf(guessArr[1]) > -1 &&
                wordArr[i].indexOf(guessArr[2]) > -1 &&
                wordArr[i].indexOf(guessArr[3]) > -1
              ) {
                finalArr.push(wordArr[i]);
              }
            }
            break;
          case 5:
            for (let i = 0; i < wordArr.length; i++) {
              if (
                wordArr[i].indexOf(guessArr[0]) > -1 &&
                wordArr[i].indexOf(guessArr[1]) > -1 &&
                wordArr[i].indexOf(guessArr[2]) > -1 &&
                wordArr[i].indexOf(guessArr[3]) > -1 &&
                wordArr[i].indexOf(guessArr[4]) > -1
              ) {
                finalArr.push(wordArr[i]);
              }
            }
            break;
          default:
            finalArr.push("");
        }
        // console.log("final array:", finalArr);
        setValue("");

        data = finalArr.map((el, ind) => {
          return <li key={ind}>{el}</li>;
        });
        setResults(data);
      } else {
        //NOTE positional guess array
        const posGuess = value.split("");
        // console.log(posGuess);

        //replaces asterisks with wildcard regex
        let guessStr = posGuess.join("").replaceAll("*", "+[a-z]+");

        // fixes extra plus signs at beginning and end
        if (guessStr.charAt(0) === "+") {
          guessStr = guessStr.replace("+", "");
        }
        if (guessStr.charAt(guessStr.length - 1) === "+") {
          guessStr = guessStr.replace(/\+$/, "");
        }

        //fixes double plus signs between wildcards
        guessStr = guessStr.replaceAll("++", "+");

        const regex = new RegExp(guessStr);
        // console.log("regex:", regex);

        for (let i = 0; i < wordArr.length; i++) {
          if (regex.test(wordArr[i])) {
            finalArr.push(wordArr[i]);
          }
        }

        // console.log("final array:", finalArr);

        // console.log(data);

        setValue("");
      }
      data = finalArr.map((el, ind) => {
        return <li key={ind}>{el}</li>;
      });
      setResults(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input letters & wildcards
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>results:</p>
      <p>number of results: {results.length}</p>
      <ul>{results}</ul>
    </div>
  );
}
