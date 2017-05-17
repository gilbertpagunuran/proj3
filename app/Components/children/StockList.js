var React = require("react");

var Stock = require("./Stock");

// Helper Function
var helpers = require("../utils/helpers");

var StockList = React.createClass({

    getInitialState: function() {
        console.log("initialState in StockList.js");
        console.log(this.props.Email);
         return {
                 Email: this.props.Email,
                };
    },

    handleStockRemove: function(stock){
        console.log("handleStockRemove", stock);
        /// assemble the portfolio row for deletion here
        // then call helper here with Email
        
        var sUser = this.props.Email;
        var sName = stock.sName;
        var sQuantity = stock.sQuantity;
        var sPrice = stock.sPrice;
        var sDate = stock.sDate;
        var sBroker = stock.sBroker;
        var delrow = {sUser: sUser, sName: sName, sQuantity: sQuantity, sPrice: sPrice, sDate: sDate, sBroker: sBroker };
 
        helpers.delStock(delrow).then((resp) => {
        console.log("comming back from helper.delStock:", resp); 
        });

        this.props.onStockRemove( stock );
    },

    render: function() {
        var stocks = [];
        // this.setState( { Email: this.props.Email } )
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