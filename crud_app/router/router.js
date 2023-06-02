const express = require("express");
const methodOverride = require("method-override");
const formidable = require("express-formidable");
const {
  HomeController,
  EditController,
  UpdateController,
  ReadController,
  AddPageController,
  AddController,
  DeleteController
} = require("../controllers/articles");

const router = express.Router();
router.use(formidable());
router.use(methodOverride("_method"));
router.get("/", HomeController);
router.get("/edit/:id", EditController);
router.put("/edit/:id", UpdateController);
router.get("/read/:id", ReadController);
router.get("/write", AddPageController);
router.post("/write", AddController);
router.delete("/:id", DeleteController);
module.exports = router;
