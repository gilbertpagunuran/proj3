var React = require("react");

var StockList = require("./children/StockList");
var NewRow = require("./children/NewRow");

var StockApp = React.createClass({ 

    getInitialState: function() {
        console.log("initialState in StockApp.js");
        console.log(this.props.Email);
         return {
                 email: this.props.Email,
                 stocklist: []
                };
    },

    handleNewRowSubmit: function ( newstock )  {
        console.log("NewRowSubmit....");
        console.log("oldList:", this.props.list);
        console.log("newstock:", newstock);
        // this.setState( {stocklist: this.props.list} );
        this.setState( {stocklist: this.props.list}, function () {
            console.log("stocklist:", this.state.stocklist);
            this.setState( {stocklist: this.state.stocklist.concat([newstock])},
              function(){
                    console.log("new stocklist:", this.state.stocklist);
                // ? update the parent's stocklist too to reflect on this child's?
                // Set the parent to have the latest stocklist array
                // this.props.setList(this.state.stocklist);
                    this.props.setList(this.state.stocklist);
              }
             );
        } );
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
     // Set the parent to have the latest stocklist array
        //  this.props.setList(this.state.stocklist);
    },

    render: function() {

        var tableStyle = {width: '80%'};
        var leftTdStyle = {width: '80%',padding:'5px',verticalAlign: 'top'};
        var rightTdStyle = {width: '20%',padding:'5px',verticalAlign: 'top'};
        return ( 
        
        <div className="container" id="stock-content">
            <div className="page-header">
            <h1>Hi {this.props.Email}!</h1>
            </div>
        

        <table style={tableStyle}>
            <tbody>
            <tr>
            <td style={leftTdStyle}>
                <StockList Email={this.props.Email} clist={this.props.list}  onStockRemove={this.handleStockRemove}/>
            </td>
            <td style={rightTdStyle}>
                <NewRow onRowSubmit={this.handleNewRowSubmit} Email={this.props.Email}/>
            </td>
            </tr>
            </tbody>
        </table>

        </div>
        );
    }
});    

module.exports = StockApp;
