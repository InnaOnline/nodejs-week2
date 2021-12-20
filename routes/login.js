const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.isAdmin) {
    res.redirect("/admin");
  }

  res.render("pages/login", {
    title: "SigIn page",
    msglogin: req.flash("status"),
  });
});

router.post("/", (req, res, next) => {
  if (
    req.body.email === "testexpress@yandex.ru" &&
    req.body.password === "123456"
  ) {
    req.session.isAdmin = true;
    res.redirect("/admin");
  }

  req.flash("status", "Email или пароль введены не верно");
  res.redirect("/login");
});

module.exports = router;
