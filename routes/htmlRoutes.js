var db = require("../models");
// "/" - First - (root)- GET
// "/login"-splash -(login page)- GET
// "/search" - search page(latest 5 results) - GET
// "/display"- display and edit page(frozen to editable property) - GET
module.exports = function(app) {
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      // res.send("Hello");
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/login", function(req, res) {
    res.render("splash");
  });

  app.get("/search", function(req, res) {
    res.render("search");
  });

  app.get("/display", function(req, res) {
    res.render("display");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
