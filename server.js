var express = require("express");
var bodyParser = require("body-parser");
// var methodOverride = require("method-override");
//---------------------------------------------
var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
//  app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

// Set Handlebars.
// var exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// var routes = require("./controller/apiController.js");
// app.use("/", routes);

// added for sequelize instead of orm
// Requiring our models for syncing
var db = require("./models");
// no router, directly use express?
// require("./controller/apiController.js")(app);
  app.post("/apiStocking", function(req, res) {
    //  console.log("apiStocking:" + stocking.sym + stocking.price); not good
    //  console.log("apiStocking:" + req.stocking.sym + req.stocking.price); not good
    
     console.log("apiStocking:" + req.body.stocking.sym + req.body.stocking.price);
      // var data1 = JSON.parse(req.stocking);   not good
      //  var data2 = JSON.parse(req.body.stocking); not good
      // console.log("apiData2:" + data2.sym + data2.price);

      db.History.findOne({
          where: { ticker: req.body.stocking.sym, lastrade: req.body.stocking.dtrade }
      })
      .then(function(histRecord) {
        // if (histRecord) {alert("This quote is already saved.");}
        // else 
        if (!histRecord)
        {

            db.History.create({
              ticker: req.body.stocking.sym,
              tickerprice: req.body.stocking.price,
              lastrade: req.body.stocking.dtrade,
              createtmstmp: Date.now()
            })
            .then(function(dbHistory) {
              // res.redirect("/");
              res.send("Saved Search");
            });

        };

      });

  });


  app.post("/apiUserAdd", function(req, res) {
    
     console.log("apiUserAdd:" + req.body.userInfo.email + req.body.userInfo.pwd);

    db.User.findOne({
      where: { useremail: req.body.userInfo.email}
    })
    .then(function(userRecord) {
        if (!userRecord) 
       {
          db.User.create({
                username: req.body.userInfo.name,
                useremail: req.body.userInfo.email,
                userpwd: req.body.userInfo.pwd,
                createtmstmp: Date.now()
          }).then(function(userRecord){
          // res.redirect("/");
              res.send("Saved Search");
          });

        };

      });

    });


  app.get("/apiUserSearch/:email/:pwd", function(req, res) {
    
    //  console.log("apiUserSearch:" + req.body.userInfo.email + req.body.userInfo.pwd);
      // console.log(req);
    db.User.findOne({
      // where: { useremail: req.body.email, userpwd: req.body.pwd }
        where: { useremail: req.params.email, userpwd: req.params.pwd }
    })
    .then(function(userRecord) {
      if (userRecord) {console.log("This user passed authentication");}
      else {console.log("email not on records.");};
       res.redirect("/");
    });

  });

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});