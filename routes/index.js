var express = require("express");
var router = express.Router();
var log4js = require("log4js");
var logger = log4js.getLogger('index');
var account_service = require("../services/account_service");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});

router.post("/register", function (req, res, next) {
  var data = req.body;
  account_service.register(data).then(function (result) {
    res.render("register", { title: "Register" });
  });
});

router.get("/login", function (req, res, next) {
  res.render("login", { login: false });
});

router.post("/login", function (req, res, next) {
  var data = req.body;
  account_service.login(data).then(function (result) {
    if (result.success == false) {
      res.render("login", result);
    } else {
      res.redirect("/");
    }
  });
});

router.get("/users", function (req, res, next) {
  account_service.users().then(function (result) {
    result["title"] = "Users page";
    res.render("users", result);
  });
});

router.get("/detailuser/:id", function (req, res, next) {
  var user_id = req.params.id;
  account_service
    .detailuser(user_id)
    .then(function (result) {
      result["title"] = "User details page";
      res.render("detailuser", result);
    })
    .catch(function (error) {
      res.status(400);
      res.json(error);
    });
});

router.get("/users/:id", function (req, res, next) {
  var user_id = req.params.id;
  account_service
    .detailuser(user_id)
    .then(function (result) {
      result["title"] = "Edit user page";
      console.log(result);
      res.render("edituser", result);
    })
    .catch(function (error) {
      res.status(400);
      res.json(error);
    });
});

router.post("/users/:id", function (req, res, next) {
  var data = req.body;
  var user_id = req.params.id;

  account_service.edituser(user_id, data).then(function (result) {
    if (result.success == false) {
      res.render("edituser", result);
    } else {
      res.redirect("/");
    }
  });
});


/* router.get("/deleteuser/:id", function (req, res, next) {
  var user_id = req.params.id;
  account_service
    .detailuser(user_id)
    .then(function (result) {
      result["title"] = "Delete user page";
      console.log(result);
      res.render("deleteuser", result);
    })
    .catch(function (error) {
      res.status(400);
      res.json(error);
    });
});

router.post("/deleteuser/:id", function (req, res, next) {
  var user_id = req.params.id;
  account_service.deleteuser(user_id).then(function (result) {
    if (result.success == false) {
      res.render("users", result);
    } else {
      res.redirect("/");
    }
  });
}); */

router.put("/users/deactivate/:id", function(req, res, next) {
  var user_id = req.params.id;
  account_service.deactivate(user_id)
  .then(function(result) {
    res.json(result);
  });
});

router.put("/users/activate/:id", function(req, res, next) {
  var user_id = req.params.id;
  account_service.activate(user_id)
  .then(function(result) {
    res.json(result);
  });
});

router.delete("/users/:id", function(req, res, next) {
  var user_id = req.params.id;
  console.log('delete user ', user_id);
  account_service.userdelete(user_id)
  .then(function(result){
    res.json(result);
  });
  
});


module.exports = router;
