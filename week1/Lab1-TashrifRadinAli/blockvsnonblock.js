//synchronous code is blocking code (the lines below) because the code must be executed in order.
let x = 5;
let y = 10;

// The lines below are example of Non-blocking code because the script below does not prevent the console log from running. 
const Timeout = setTimeout(message, 5000)

function message(){
    console.log("I am not blocking even after 5 seconds");
}

// Executed even when the timer is running (above)
console.log(y/x);