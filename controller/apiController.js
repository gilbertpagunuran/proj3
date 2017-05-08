var db = require("../models");  

module.exports = function(app) {
//   app.get("/", function(req, res) {
//    db.Burger.findAll({}).then(function(dbBurger) {
//       // We have access to the burgers as an argument inside of the callback function
//       // res.json(dbBurger);
//       var hbsObject = {burgers: dbBurger};
//       console.log(hbsObject);
//       res.render("index", hbsObject);
//     });

//   });

  // app.post("/apiStocking", function(req, res) {
  //     console.log("apiStocking:" + req.body);
  //   db.History.create({
  //     ticker: req.body.sym,
  //     tickerprice: req.body.price,
  //     createtmstmp: Date().now
  //   })
  //   .then(function(dbHistory) {
  //     // res.redirect("/");
  //     console.log("added?");
  //   });

  // });

//   app.put("/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     console.log("condition", condition);
//     console.log(`req.body.eaten= ${req.body.eaten}`);
//     console.log(`req.params.eaten= ${req.params.eaten}`);

//     db.Burger.update(
//     {
//       devoured: req.body.eaten
//     }, 
//     {where: {id: req.params.id}}
//     ).then(function(dbBurger) {
//       // res.json(dbBurger);
//       res.redirect("/");
//     });

//   });

};