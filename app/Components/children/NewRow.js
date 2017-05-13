var React = require("react");

var NewRow = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();
        var sName = this.refs.sName.value;
        var sQuantity = this.refs.sQuantity.value;
        var sPrice = this.refs.sPrice.value;
        var sDate = this.refs.sDate.value;
        var sBroker = this.refs.sBroker.value;
        var newrow = {sName: sName, sQuantity: sQuantity, sPrice: sPrice, sDate: sDate, sBroker: sBroker };
        this.props.onRowSubmit( newrow );

        this.refs.sName.value = '';
        this.refs.sQuantity.value = '';
        this.refs.sPrice.value = '';
        this.refs.sDate.value = '';
        this.refs.sBroker.value = '';
        return false;
    },
    render: function() {
        var inputStyle = {padding:'12px'}
        return ( 
        <div className="well">
            {/*<h5>Add A Position</h5>*/}
        <form onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg" style={inputStyle}>
            <input type="text"  className="form-control col-md-8"  placeholder="Symbol" ref="sName"/>
        </div>
        <div className="input-group input-group-lg" style={inputStyle}>
            <input type="number"  className="form-control col-md-8" placeholder="Shares" ref="sQuantity"/>
        </div>
        <div className="input-group input-group-lg" style={inputStyle}>
            <input type="decimal"  className="form-control col-md-8" placeholder="Price" ref="sPrice"/>
        </div>
        <div className="input-group input-group-lg" style={inputStyle}>
            <input type="date"  className="form-control col-md-4" placeholder="MM-DD-YYYY" ref="sDate" required/>
        </div>
        <div className="input-group input-group-lg" style={inputStyle}>
            <input type="text"  className="form-control col-md-4" placeholder="Custodian" ref="sBroker"/>
        </div>
        <div className="input-group input-group-lg" style={inputStyle}>
            <input type="submit"  className="btn btn-primary" value="Position"/>
        </div>
        </form>

        </div>
        );
    }
});

module.exports = NewRow;