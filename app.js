const { writeFile } = require("node:fs");

const data = "Hello World";
writeFile("message.txt", data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
