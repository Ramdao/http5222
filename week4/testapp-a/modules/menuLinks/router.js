const express = require("express");
const router = express.Router();
const menuLinks = require("./functions");

//ADMIN PAGE ROUTES
/*
  /admin/menu (Main admin page for all menu links)
  - /admin/menu/add (Page with form to add new link)
*/
router.get("/", async (request, response) => {
  let links = await menuLinks.getLinks();
  response.render("admin/menu-list", { title: "Administer menu", menu: links });
});
router.get("/add", async (request, response) => {
  let links = await menuLinks.getLinks();
  response.render("admin/menu-add", { title: "Add menu link", menu: links });
});
router.post("/add/submit", async (request, response) => {
  //For POST forms, data is sent via request.body
  //For GET forms, data is sent via request.query
  console.log(request.body.path);
  let newLink = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };
  await menuLinks.addLink(newLink);
  response.redirect("/admin/menu"); //redirect back to the main menu admin page
});
router.get("/delete", async (request, response) => {
  await menuLinks.deleteLink(request.query.linkId);
  response.redirect("/admin/menu");
});

module.exports = router;
