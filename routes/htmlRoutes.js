var db = require("../models");
var jwt = require("jsonwebtoken");
// "/" - First - (root)- GET
// "/login"-splash -(login page)- GET
// "/search" - search page(latest 5 results) - GET
// "/display"- display and edit page(frozen to editable property) - GET
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("login");
  });
  //
  // Rendering page First
  //
  app.get("/first/:id", verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
      if (err) {
        res.sendStatus(403);
      }
      db.User.findByPk(req.params.id).then(function(user) {
        db.Category.findAll().then(function(categories) {
          res.render("first", {
            userName: user.userName,
            categories: categories
          });
        });
      });
    });
  });

  app.get("/search", function(req, res) {
    res.render("search");
  });

  app.get("/display", function(req, res) {
    res.render("display");
  });

  app.get("/admin/:command", function(req, res) {
    if (req.params.command !== "cat") {
      res.send("Bad request");
    }
    db.Category.findAll()
      .then(function(catList) {
        if (catList.length !== 0) {
          res.send("Category in DB already");
        }
        db.Category.bulkCreate([
          { category: "Not selected" },
          { category: "Restaurant" },
          { category: "Food" },
          { category: "Drink" }
        ])
          .then(function() {
            res.send("Categories created");
          })
          .catch(function(err) {
            res.send("Can't create Categories");
            console.log(err);
          });
      })
      .catch(function(err) {
        res.send("Can't create Categories");
        console.log(err);
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  function verifyToken(req, res, next) {
    console.log("hello from verifyToken");
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      req.token = bearerHeader.split(" ")[1];
      next();
    } else {
      res.sendStatus(403);
    }
  }
};
