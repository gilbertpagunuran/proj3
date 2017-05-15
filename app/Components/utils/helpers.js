// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions (in this case the only one is runQuery)
var helpers = {

  runQuery: function(symbol) {

    console.log("running runQuery:" + symbol);

    var queryURL = "http://finance.google.com/finance/info?client=ig&q=NASDAQ%3A" +
      symbol;

    return axios.get(queryURL).then(function(response) {
        var data = JSON.parse(response.data.substring(3));
        console.log(data);
        console.log(data[0].l);
        //console.log(response);  //good
        // return data[0].l;      // good
        return data[0];  
    });

  },

  // This function hits our own server to retrieve the recordS of query results
  // getHolding: function() {
  //   return axios.get("/api");
  // },

  // This function posts new RECORDS to our History table.
  postStocking: function(stocking) {
    console.log("about to axios.post with stocking=" + stocking);
    console.log(stocking);
    return axios.post("/apiStocking", { stocking: stocking });
  },

    // This function inserts new User to our User table.
  addUser: function(userInfo) {
    console.log("about to axios.post with userinfo=" + userInfo);
    console.log(userInfo);
    return axios.post("/apiUserAdd", { userInfo: userInfo })
      .then(function(response){
          console.log('saved successfully');
          console.log(response);
      });
  },

  // This function retrieves email from our User table.
  getUser: function(userInfo) {
    console.log("about to axios.get with userinfo=" + userInfo);
    console.log(userInfo);
    var queryURL = "/apiUserSearch/" + userInfo.email + "/" + userInfo.pwd;
    return axios.get(queryURL).then(function(response) {
        console.log("about to display response from axios.get");
        console.log(response);  //good
        return response.data;  
    });

  },

      // This function posts new RECORDS to our Portfolio table.
  postPortfolio: function(holding) {
    console.log("about to axios.post with holdinginfo=" + holding);
    console.log(holding);
    return axios.post("/apiAddHolding", { holding: holding });

  }

};

// We export the helpers object (which contains runQuery)
module.exports = helpers;