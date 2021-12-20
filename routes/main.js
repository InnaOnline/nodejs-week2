const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const Db = require("../db/index");

router.get("/", (req, res, next) => {
  const skills = Db.skills;
  const products = Db.products;

  res.render("pages/index", {
    title: "Main page",
    products,
    skills,
    msgemail: req.flash("status"),
  });
});

router.post("/", (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    req.flash("status", "При отправке произошла ошибка. Заполните все поля!");
    res.redirect("/");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "adell.aufderhar37@ethereal.email",
      pass: "NwweNZTUKCDewJKZxM",
    },
  });

  const info = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: "adell.aufderhar37@ethereal.email",
    subject: "Сообщение с сайта",
    text:
      req.body.message.trim().slice(0, 500) +
      `\n Отправлено с <${req.body.email}>`,
  };

  transporter.sendMail(info, function (err, info) {
    if (err) {
      req.flash("status", `При отправке произошла ошибка ${err}`);
    }

    req.flash("status", "Письмо успешно отправлено");
    res.redirect("/");
  });
});

module.exports = router;
