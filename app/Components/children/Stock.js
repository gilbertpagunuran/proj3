var React = require("react");

var Stock = React.createClass({
handleRemoveStock: function() {
    this.props.onStockDelete( this.props.stock );
    return false;
},
render: function() {
    return (
    <tr>
        <td>{this.props.stock.sName}</td>
        <td>{this.props.stock.sQuantity}</td>
        <td>{this.props.stock.sPrice}</td>
        <td>{this.props.stock.sDate}</td>
        <td>{this.props.stock.sBroker}</td>
        <td><input type="button"  className="btn btn-primary" value="Remove" onClick={this.handleRemoveStock}/></td>
    </tr>
    );
}
});

module.exports = Stock;