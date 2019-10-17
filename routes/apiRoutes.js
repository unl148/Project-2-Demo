var moment = require("moment");

var db = require("../models");

module.exports = function(app) {
  // POST "/api/users"- create new newUser - POST  "/api/users"- send id
  app.post("/api/users", function(req, res) {
    // console.log(req.body.userName);
    db.User.create(req.body)
      .then(function(result) {
        res.json({
          userName: result.userName,
          id: result.id
        });
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
    // console.log("GET /api/users:", req.params.userName);
    db.User.findOne({
      where: {
        userName: req.params.userName
      }
    })
      .then(function(result) {
        if (result === null) {
          res.send("not found");
        } else {
          res.json({
            id: result.id
          });
        }
      })
      .catch(function(err) {
        res.send("DB Error");
        console.log(err);
      });
  });
  app.post("/api/newthought", function(req, res) {
    // console.log("\nREQ BODY:", req.body);
    db.Thought.create(req.body)
      .then(function() {
        res.end();
      })
      .catch(function(err) {
        res.send("DB Error");
        console.log(err);
      });
  });

  app.get("/api/search/:userId", function(req, res) {
    db.User.findOne({
      where: {
        Id: req.params.userId
      },
      include: [
        {
          model: db.Thought,
          include: [db.Category]
        }
      ]
    })
      .then(function(result) {
        result.Thoughts.forEach(function(element) {
          element.dateTimeFormated = moment(element.dateTime).format(
            "M/D/Y h:m a"
          );
        });
        res.render("search", {
          thoughts: result.Thoughts,
          userName: result.userName
        });
      })
      .catch(function(err) {
        res.send("DB Error");
        console.log(err);
      });
  });
  //ROUTE FOR SEARCH INSIDE SEARCH HTML!!!!!!
  // according to routes file it should be /api/search/:id
  // but we used it already for rendering starting search page
  // so i use /search/:id for new searches
  // eslint-disable-next-line no-unused-vars
  app.get("/api/thought/:id", function(req, res) {
    db.Thought.findOne({ where: { id: req.params.id } })
      .then(function(result) {
        console.log("Display Result");
        console.log(result);
        res.render("display", { thought: result });
      })
      .catch(function(err) {
        res.send("DB Error");
        console.log(err);
      });
    //check out how query look, im not sure what to do with it now.
    console.log(req.params.id);
  });
};
