require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", function (req, res) {
  res.json({ planet: "earth" });
});

app.listen(PORT, () => {
  console.log(`Listenning to the port http://localhost:${PORT}`);
});

module.exports = app;
