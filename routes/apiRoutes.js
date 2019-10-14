var db = require("../models");

module.exports = function(app) {
  // POST "/api/users"- create new newUser - POST  "/api/users"- send id
  app.post("/api/users", function(req, res) {
    db.User.create(req.body)
      .then(function(result) {
        res.render("first", { userName: result.userName, id: result.id });
        //find all thougths of user with Categories

        // db.User.findByPk(result.id).then(function(list) {
        //   res.json(list); //testing
        //   // res.render("search");
        // });
      })
      .catch(function(err) {
        if (err.parent.errno === 1062) {
          res.status(404).send("duplicate");
        } else {
          res.status(404).send("DB Error");
          console.log(err);
        }
      });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
