//MODULE EXAMPLE
//The logger is for logging messages to the console.
var privateMsg = "My private message"; //not exported, so it stays only accessible within this file (module)
var randString = "Some random string...";

export function getMessage() {
  console.log(privateMsg);
}
export function setMessage(newMsg) {
  privateMsg = newMsg;
}

//There can only be ONE default export.
export default randString; //If importing from this file without curly braces, it will import the default export.
