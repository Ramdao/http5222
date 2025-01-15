//DEMO BLOCKING VS NON-BLOCKING SCRIPT
//Sequential (synchronous) code is blocking code (the lines below) because the code must be executed in order.
let x = 3;
let y = 4;

//The event handler (below) is an example of non-blocking code because the script (callback function) doesn't prevent the sum console log from running first even if the button has not been clicked yet.
document.getElementById("testBtn").addEventListener("click", () => {
  console.log("Clicked");
  console.log("Another random message");
});

let sum = x + y;
console.log(sum);