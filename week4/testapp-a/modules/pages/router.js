const express = require("express");
const router = express.Router();
const menuLinks = require("../menuLinks/functions");

//Home page route
router.get("/", async (request, response) => {
  let links = await menuLinks.getLinks();
  response.render("index", { title: "Home", menu: links });
});
//About page route
router.get("/about", async (request, response) => {
  let links = await menuLinks.getLinks();
  response.render("about", { title: "About", menu: links });
});

module.exports = router;