var db = require("../models");

module.exports = function(app) {
  // POST "/api/users"- create new newUser - POST  "/api/users"- send id
  app.post("/api/users", function(req, res) {
    // console.log(req.body.userName);
    db.User.create(req.body)
      .then(function(result) {
        res.json({ userName: result.userName, id: result.id });
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

  app.get("/api/users/:userName", function(req, res) {
    db.User.findOne({ where: { userName: req.params.userName } })
      .then(function(result) {
        res.json({ id: result.id });
      })
      .catch(function(err) {
        console.log(err.parent.errno);
        if (err.parent.errno === 1062) {
          res.status(404).send("not found");
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
