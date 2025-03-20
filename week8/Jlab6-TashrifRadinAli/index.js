const express = require("express");
const path = require("path");
const { JSDOM } = require("jsdom");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

let xml;
async function loadXml() {
  if (!xml) {
    let response = await fetch("http://localhost:8888/library-data.kml", {
      method: "get",
      headers: { "Content-Type": "application/xml" }
    });
    let data = new JSDOM(await response.text(), { contentType: "application/xml" });
    xml = data.window.document;
  }
  return xml;
}

async function loadLibraries() {
  let xmlDocument = await loadXml();
  return xmlDocument.querySelectorAll("Placemark");
}

async function getLibraryById(id) {
  let xmlDocument = await loadXml();
  return xmlDocument.getElementById(id);
}

app.get("/", async (req, res) => {
  let libraries = await loadLibraries();
  res.render("index", { title: "Libraries", libraries });
});

app.get("/library/:id", async (req, res) => {
  let library = await getLibraryById(req.params.id);
  res.render("library", { title: library.querySelector("name").textContent, library });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
