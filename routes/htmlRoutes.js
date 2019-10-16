var db = require("../models");
// "/" - First - (root)- GET
// "/login"-splash -(login page)- GET
// "/search" - search page(latest 5 results) - GET
// "/display"- display and edit page(frozen to editable property) - GET
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("login");
  });
  app.get("/first/:id", function(req, res) {
    db.User.findByPk(req.params.id).then(function(user) {
      res.render("first", {
        userName: user.userName
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
    if (req.params.command === "cat") {
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
    } else {
      res.send("Bad request");
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
