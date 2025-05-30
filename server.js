const express = require("express");
const app = express();

//routes

app.get("/", (req, res) => {
  res.send("Hello Node APi");
});
app.listen(8000, () => {
  console.log("Node APi is Runnung on Port 8000");
});
