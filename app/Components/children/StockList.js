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

        {this.props.clist.map(function(stock, i){
            stocks.push(<Stock stock={stock} onStockDelete={that.handleStockRemove} key={i} />);
         })};

        return ( 
        <div>
            {/*<h5>Current Positions</h5>*/}
            <table className="table table-striped">
             <thead>
              <tr>
                <th>Symbol</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Date</th>
                <th>Broker</th>
                <th>Action</th>
              </tr>
             </thead>
            <tbody>{stocks}</tbody>
            </table>
        </div>
        );
    }
});

module.exports = StockList;