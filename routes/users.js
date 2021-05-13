var express = require("express");
var router = express.Router();
var account_service = require("../services/account_service");

/* GET users listing. */
router.get("/", function (req, res, next) {
  account_service.users().then((response) => {
    // res.json({ status: 200, users: response });
    res.render("users", { title: "Users", users: response });
  });
});

module.exports = router;
