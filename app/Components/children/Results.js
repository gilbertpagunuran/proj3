// Include React
var React = require("react");

// This is the main component. It includes the banner and Results element.
var Results = React.createClass({

  // Here we render the function
  render: function() {
    var fstyle= {margin:'75px', width: '75%'};
    return (
      <div className="panel panel-default" style={fstyle}>
        <div className="panel-heading">
          <h3 className="panel-title text-center">As Of {this.props.data.lt}</h3>
        </div>
        <div className="panel-body text-center">
          <h2>{this.props.data.t}</h2>
          <h2>{this.props.data.l}</h2>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;