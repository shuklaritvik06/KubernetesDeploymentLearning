const express = require("express");
const app = express();
const port = process.env.PORT;
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database connected!");
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello Bro!"
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
