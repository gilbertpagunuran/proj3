var React = require("react");

var Stock = require("./Stock");

var StockList = React.createClass({
    handleStockRemove: function(stock){
        console.log("handleStockRemove");
        this.props.onStockRemove( stock );
    },
    render: function() {
        var stocks = [];
        var that = this; // TODO: Needs to find out why that = this made it work; Was getting error that onStockDelete is not undefined
        // this.props.clist.forEach(function(stock) {
        // stocks.push(<Stock stock={stock} onStockDelete={that.handleStockRemove} /> );
        // });

        // for (var i = 0; i < this.props.clist.length; i++) {
        //     stocks.push(<Stock stock={stock} onStockDelete={that.handleStockRemove} key={i} />);
        // }

        {this.props.clist.map(function(stock, i){
            stocks.push(<Stock stock={stock} onStockDelete={that.handleStockRemove} key={i} />);
         })};

        return ( 
        <div>
            <h3>List of Stocks</h3>
            <table className="table table-striped">
            <thead><tr><th>Stock Name</th><th>Quantity</th><th>Share Value</th><th>Action</th></tr></thead>
            <tbody>{stocks}</tbody>
            </table>
        </div>
        );
    }
});

module.exports = StockList;