// load env

const dontenv = require("dotenv");
dontenv.config();

//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path"); //this modules contains methods that we can use for path concatenation

//IMPORT PAGE ROUTERS
const pageRouter = require("./modules/pages/router");
const adminRouter = require("./modules/menuLinks/router");

//SET UP EXPRESS APP
const app = express();
const port = process.env.PORT || "8888";

//SET UP EXPRESS TO USE "templates" FOLDER FOR VIEWS
app.set("views", path.join(__dirname, "templates")); //set the path to the /templates folder for views
app.set("view engine", "pug"); //set Pug as the Express app's template engine

//SET UP EXPRESS TO USE THE "public" FOLDER FOR STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

/* 
  Typically, forms send data in the urlencoded format (weight=0&path=/&name=Home). The following two lines of code will extend the allowed types to use JSON, so that we can now receive the form data as the following: { weight: 0, path: "/", name: "Home" }
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", pageRouter);
app.use("/admin/menu", adminRouter);

//SET SERVER TO LISTENING
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

