const words = require("./vertopal.com_words.json");

const wordArr = JSON.stringify(words).split("\\");

for (let i = 0; i < wordArr.length; i++) {
  wordArr[i] = wordArr[i].slice(1, 6);
}

//NOTE guess array
const guessArr = ["a", "c", "k"];

const resArr = [];

switch (guessArr.length) {
  case 1:
    for (let i = 0; i < wordArr.length; i++) {
      if (wordArr[i].indexOf(guessArr[0]) > -1) {
        resArr.push(wordArr[i]);
      }
    }
    break;
  case 2:
    for (let i = 0; i < wordArr.length; i++) {
      if (
        wordArr[i].indexOf(guessArr[0]) > -1 &&
        wordArr[i].indexOf(guessArr[1]) > -1
      ) {
        resArr.push(wordArr[i]);
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
        resArr.push(wordArr[i]);
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
        resArr.push(wordArr[i]);
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
        resArr.push(wordArr[i]);
      }
    }
    break;
  default:
    resArr.push("");
}

export { resArr };
// console.log(resArr);

//NOTE positional guess array
const posGuess = ["*", "*", "a", "c", "k"];

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

const finalArr = [];

for (let i = 0; i < resArr.length; i++) {
  if (regex.test(resArr[i])) {
    finalArr.push(resArr[i]);
  }
}

// console.log(finalArr.length > 0 ? finalArr : resArr);
export { finalArr };
