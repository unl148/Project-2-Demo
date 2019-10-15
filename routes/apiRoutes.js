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
          res.send("duplicate");
        } else {
          res.send("DB Error");
          console.log(err);
        }
      });
  });

  app.get("/api/users/:userName", function(req, res) {
    console.log("GET /api/users:", req.params.userName);
    db.User.findOne({ where: { userName: req.params.userName } })
      .then(function(result) {
        if (result === null) {
          res.send("not found");
        } else {
          res.json({ id: result.id });
        }
      })
      .catch(function(err) {
        res.send("DB Error");
        console.log(err);
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
