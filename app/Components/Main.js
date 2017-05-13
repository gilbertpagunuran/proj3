// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var StockApp = require("./StockApp");

// Helper Function
var helpers = require("./utils/helpers");

// This is the main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    console.log("initialState in Main.js");
    return { searchTerm: "", results: ""};
  },

  // componentDidUpdate is a lifecycle method that will get run every time the component updates it's
  // props or state
  componentDidUpdate: function(prevProps, prevState) {
    // If we have a new search term, run a new search
    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm).then(function(data) {
        if (data !== this.state.results) {
          console.log("coming back from runQuery:" + data.t + data.l);
          this.setState({ results: data });
          // insert db posting here   !!!!!!!
          var stocking = {sym: data.t, price: data.l, dtrade: data.lt};
          console.log("stocking:" + stocking);
          helpers.postStocking(stocking).then(function(resp) {

            console.log("comming back from helper.postStocking" + resp);

          });



        }
        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));
    }
  },
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },


  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container-fluid"  id="main-content">

        <div className="row">
          <div className="col-md-9">
                <StockApp />
          </div>

          <div className="col-md-3">
            <Form setTerm={this.setTerm} />
          {/*</div>

          <div className="col-md-3">*/}
            <Results data={this.state.results} />
          </div>
        </div>  

       </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;