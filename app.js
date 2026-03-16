const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const connection = require("./db/connection.js");

app.listen(3000, () => {
  console.log("Server is listening");
});
