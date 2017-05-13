var React = require("react");

var StockList = require("./children/StockList");
var NewRow = require("./children/NewRow");

var StockApp = React.createClass({ 

    getInitialState: function() {
        // return {stocklist: [{sName:"",sQuantity:0 ,sPrice:""}]};
         return {stocklist: []};
    },
    handleNewRowSubmit: function( newstock ) {
        this.setState( {stocklist: this.state.stocklist.concat([newstock])} );
    },
    handleStockRemove: function( stock ) {

        var index = -1; 
        var clength = this.state.stocklist.length;
        for ( var i = 0; i < clength; i++ ) {
            if( this.state.stocklist[i].sName === stock.sName ) 
            {index = i;
            break;
            }
        };
        this.state.stocklist.splice( index, 1 );  
        this.setState( {stocklist: this.state.stocklist} );
    },

    render: function() {
        var tableStyle = {width: '90%'};
        var leftTdStyle = {width: '80%',padding:'5px',verticalAlign: 'top'};
        var rightTdStyle = {width: '20%',padding:'5px',verticalAlign: 'top'};
        return ( 
        
        <div className="container" id="stock-content">
            {/*<div className="page-header">
            <h1>Adding A Table Row in ReactJS</h1>
            </div>
        */}

        <table style={tableStyle}>
            <tbody>
            <tr>
            <td style={leftTdStyle}>
                <StockList clist={this.state.stocklist}  onStockRemove={this.handleStockRemove}/>
            </td>
            <td style={rightTdStyle}>
                <NewRow onRowSubmit={this.handleNewRowSubmit}/>
            </td>
            </tr>
            </tbody>
        </table>

        </div>
        );
    }
});    

module.exports = StockApp;
