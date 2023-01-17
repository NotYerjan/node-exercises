const { createServer } = require("node:http");

function createdApp() {
  return createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("Welcome to the World Wide Web!");
  });
}
module.exports = createdApp;
