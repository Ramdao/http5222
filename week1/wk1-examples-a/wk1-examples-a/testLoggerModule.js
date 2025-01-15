import { getMessage, setMessage } from "./loggerModule.js";
import rString from "./loggerModule.js";

getMessage();
console.log(rString);
setMessage("Here is my new string");
getMessage();