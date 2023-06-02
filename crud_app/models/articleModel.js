require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(`mongodb://USERNAME:PASSWORD@db:27017/`)
  .then(() => console.log("Success!"))
  .catch((err) => console.error(err));
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});
const articleModel = mongoose.model("article", Schema);
module.exports = articleModel;
