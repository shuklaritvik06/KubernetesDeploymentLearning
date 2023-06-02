const articleModel = require("../models/articleModel");
const marked = require("marked");

module.exports.HomeController = function (req, res) {
  articleModel
    .find()
    .sort({ date: "desc" })
    .then((result) => {
      res.render("home", { blogs: result });
    })
    .catch((err) => console.error(err));
};
module.exports.EditController = function (req, res) {
  articleModel
    .findById(`${req.params.id}`)
    .then((result) => {
      res.render("edit", { blog: result });
    })
    .catch((err) => console.error(err));
};
module.exports.UpdateController = function (req, res) {
  let article = new articleModel({
    _id: req.params.id,
    ...req.fields,
    date: `${new Date().toLocaleDateString()}`
  });
  articleModel
    .replaceOne({ _id: req.params.id }, article)
    .then(() => res.redirect("/article"));
};
module.exports.ReadController = function (req, res) {
  articleModel
    .findById(`${req.params.id}`)
    .then((result) => {
      result.body = marked.parse(result.body);
      res.render("readmore", { blog: result });
    })
    .catch((err) => console.error(err));
};
module.exports.AddPageController = function (req, res) {
  res.render("write");
};
module.exports.AddController = function (req, res) {
  let article = new articleModel({
    ...req.fields,
    date: `${new Date().toLocaleDateString()}`
  });
  article
    .save()
    .then(() => res.redirect("/article"))
    .catch((err) => console.error(err));
};
module.exports.DeleteController = function (req, res) {
  articleModel
    .findByIdAndDelete(`${req.params.id}`)
    .then(() => res.redirect("/article"))
    .catch((err) => console.error(err));
};
