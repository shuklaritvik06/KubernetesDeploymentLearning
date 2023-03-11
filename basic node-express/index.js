const express = require("express");
const app = express();
app.get("/", function (req, res) {
  res.send('{ "response": "Hello Bro!" }');
});
app.listen(5000, () => console.log("Server started on port 5000"));
