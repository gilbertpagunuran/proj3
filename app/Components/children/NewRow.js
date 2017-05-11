var React = require("react");

var NewRow = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();
        var sName = this.refs.sName.getDOMNode().value;
        var sQuantity = this.refs.sQuantity.getDOMNode().value;
        var sPrice = this.refs.sPrice.getDOMNode().value;
        var newrow = {sName: sName, sQuantity: sQuantity, sPrice: sPrice };
        this.props.onRowSubmit( newrow );

        this.refs.sName.getDOMNode().value = '';
        this.refs.sQuantity.getDOMNode().value = '';
        this.refs.sPrice.getDOMNode().value = '';
        return false;
    },
    render: function() {
        var inputStyle = {padding:'12px'}
        return ( 
        <div className="well">
            {/*<h3>Add A Stock</h3>*/}
        <form onSubmit={this.handleSubmit}>
            <div className="input-group input-group-lg" style={inputStyle}>
            <input type="text"  className="form-control col-md-8"  placeholder="Stock Name" ref="sName"/>
            </div>
            <div className="input-group input-group-lg" style={inputStyle}>
            <input type="text"  className="form-control col-md-8" placeholder="Quantity" ref="sQuantity"/>
            </div>
            <div className="input-group input-group-lg" style={inputStyle}>
            <input type="text"  className="form-control col-md-8" placeholder="Share Value" ref="sPrice"/>
            </div>
            <div className="input-group input-group-lg" style={inputStyle}>
            <input type="submit"  className="btn btn-primary" value="Add Stock"/>
            </div>
        </form>

        </div>
        );
    }
});

module.exports = NewRow;