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

// Requiring our models for syncing
var db = require("./models");
// no router, directly use express?
// require("./controller/apiController.js")(app);

//============    INSERTING STOCK QUOTES FOR HISTORY ROW  =============================
  app.post("/apiStocking", function(req, res) {
    
     console.log("apiStocking:" + req.body.stocking.sym + req.body.stocking.price);

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

//============    INSERTING PORTFOLIO ROW  =============================
  app.post("/apiAddHolding", function(req, res) {
    console.log("about to display passed date from html...");
    console.log(req.body.holding.date);
    
    console.log("apiAddPortfolio:" + req.body.holding.sym + req.body.holding.price);

      db.Portfolio.findOne({
          where: {useremail: req.body.holding.owner,
                  ticker: req.body.holding.sym,
                  tickerdate: req.body.holding.date,
                  tickershares: req.body.holding.qty,
			            tickerprice: req.body.holding.price,
                  broker: req.body.holding.broker
                }
      })
      .then(function(assRecord) {
        // if (histRecord) {alert("This quote is already saved.");}
        // else 
        if (!assRecord)
        {
            db.Portfolio.create({
              useremail: req.body.holding.owner,
              ticker: req.body.holding.sym,
              tickerdate: req.body.holding.date,
              tickershares: req.body.holding.qty,
			        tickerprice: req.body.holding.price,
              broker: req.body.holding.broker,
              createtmstmp: Date.now()
            })
            .then(function(dbPortfolio) {
              // res.redirect("/");
              res.send(dbPortfolio);
            });

        };

      });

  });

//============    DELETING PORTFOLIO ROW  =============================
  app.post("/apiDelStock", function(req, res) {
    console.log("about to display passed date from html...", req.body);

      db.Portfolio.destroy({
          where: {useremail: req.body.delrow.sUser,
                  ticker: req.body.delrow.sName,
                  tickerdate: req.body.delrow.sDate,
                  tickershares: req.body.delrow.sQuantity,
			            tickerprice: req.body.delrow.sPrice,
                  broker: req.body.delrow.sBroker
                }
      })
      .then(function(delRecord) {
        console.log("delete results:", delRecord);
        // res.sendStatus(delRecord);
        res.send(delRecord);
      });

  });

//============    INSERTING REGISTERED USER ROW  =============================
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
          }).then(function(dbRecord){
          // res.redirect("/");
              res.send(dbRecord);
          });

        };

      });

    });

//============    RETRIEVING REGISTERED USER ROW  =============================
  app.get("/apiUserSearch/:email/:pwd", function(req, res) {
    
    //  console.log("apiUserSearch:" + req.body.userInfo.email + req.body.userInfo.pwd);
      // console.log(req);
    db.User.findOne({
      // where: { useremail: req.body.email, userpwd: req.body.pwd }
        where: { useremail: req.params.email, userpwd: req.params.pwd }
    })
    .then(function(userRecord) {
      if (userRecord) {
        console.log("This user passed authentication");
        res.send(userRecord);
      }
      else {
        console.log("email not on records.");
        res.send("email not on records.");
      };
    
    });

  });

//============   RETRIEVING PORTFOLIO ROWS  =============================
 app.get("/apiPortfolioSearch/:email", function(req, res) {
    
    db.Portfolio.findAll({
        where: { useremail: req.params.email }
    })
    .then(function(holdings) {
      if (holdings) {
        console.log("This user has holdings");
        res.send(holdings);
      }
      else {
        var holdings = [];
        console.log("email not on records.");
        res.send(holdings);
      };
    
    });

  });

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});