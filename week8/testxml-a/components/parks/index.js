const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
let parkNS = "http://www.example.org/PFRMapData";

async function loadXml() {
  if (xml == undefined) {
    let response = await fetch(
      "http://localhost:8888/facilities-data.xml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadParks() {
  xmlDocument = await loadXml(); //this is the XML document we'll use to query
  return xmlDocument.querySelectorAll("Location");
}
async function getParkById(id) {
  xmlDocument = await loadXml(); //load the XML document object
  //Example path: "//Location[LocationID/text()='1']"
  let results = xmlDocument.evaluate(
    `//Location[LocationID/text()='${id}']`,
    xmlDocument,
    parkNS,
    4,
    null
  );
  return results.iterateNext();
}

module.exports = {
  loadParks,
  getParkById
};