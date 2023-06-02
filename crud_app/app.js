const express = require("express");
const Router = require("./router/router");
const PORT = process.env.PORT || 5000;
const app = express();
app.set("view engine", "ejs");
app.use("/article", Router);
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
