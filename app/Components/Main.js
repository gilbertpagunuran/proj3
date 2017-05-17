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
    return { searchTerm: "", results: "", 
             logemail: "",  logpwd: "",
             regemail: "", reguser: "", regpwd: "",
             email: "", list: [] };
  },

  // componentDidUpdate is a lifecycle method that will get run every time the component updates it's
  // props or state
  componentDidUpdate: function(prevProps, prevState) {
    // If we have a new search term, run a new search
    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm).then(function(data) {
        if (data !== this.state.results) {
          console.log("coming back from runQuery:" + data.t + data.lt);
          this.setState({ results: data });
        }

      }.bind(this));
    }
  },

  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  setList: function(stockapplist) {
    this.setState({ list: stockapplist });
  },

  handleChange: function(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // When a user logs in...
  handleLogIn: function(event) {
  
    event.preventDefault();
    console.log("logmodal input:" + this.state.logemail + this.state.logpwd);
  
    var userInfo = {email: this.state.logemail, pwd: this.state.logpwd};
    console.log("userInfo:" + userInfo);

     helpers.getUser(userInfo).then((resp) => {

       console.log("comming back from helper.getUser" , resp);
       console.log(resp.useremail); // email address should be accessible here
       this.setState({ email: resp.useremail }, function() {


       // then use this email address to pass to util.helper to findall rows where email=email
       // populate an object to be PASSED stockapp.js as stocklist

            helpers.getHoldings(this.state.email).then((resp) => {
              console.log("comming back from helper.getHoldings" , resp);
              // build stocklist according to NewRow definition
              var stocks = [];
              
              {resp.map(function(stock, i){
                          var sUser = stock.useremail;
                          var sName = stock.ticker;
                          var sQuantity = stock.tickershares;
                          var sPrice = stock.tickerprice;
                          var sDate = stock.tickerdate;
                          var sBroker = stock.broker;
                          var newrow = {sName: sName, sQuantity: sQuantity, sPrice: sPrice, sDate: sDate, sBroker: sBroker };
                  stocks.push( {sName: sName, sQuantity: sQuantity, sPrice: sPrice, sDate: sDate, sBroker: sBroker });
              })};
              
              this.setState({ list: stocks });

            });  // getHoldings ends
       
       });

     });

    // Clearing the input field after submitting
    this.setState({ logemail: "", logpwd: "" });
  },

  handleRegister: function(event) {

    event.preventDefault();
    console.log("regmodal input:" + this.state.regemail + this.state.reguser + this.state.regpwd);
  
    var userInfo = {name: this.state.reguser, email: this.state.regemail, pwd: this.state.regpwd};
    console.log("userInfo:" + userInfo);

     helpers.addUser(userInfo).then((resp) => {

       console.log("comming back from helper.addUser:", resp); 

       console.log(resp.useremail);

       this.setState({ email: resp.useremail });  // this is the active email now

     });

    // Clearing the input field after submitting
    this.setState({ regemail: "", reguser: "", regpwd: "" });
  },

  // Here we describe this component's render method
render: function() {
  return (
    <div className="container-fluid"  id="main-content">
        <div className="row">
          <div className="col-md-9">
                <StockApp  Email={this.state.email} list={this.state.list} setList={this.setList} />
          </div>
          <div className="col-md-3">
                <Form setTerm={this.setTerm} />
                <Results data={this.state.results} />
          </div>
        </div> 

      {/*  -----   Log In Modal follows -------  */}

      <div className="modal" id="logModal" role="dialog">            
        <div className="modal-dialog">            
            {/*<!-- Modal content-->*/}
            <div className="modal-content">
                <div className="modal-header"> 
                 <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body"> 
                 <div className="panel panel-primary">

                    <div className="panel-heading">
                     <h3 className="panel-title" id="logUsr"><strong>User LogIn</strong></h3>
                    </div>

                    <div className="panel-body">

                     <form>
                        <div className="form-group">
                          <label for="logemail">eMail</label>
                          <input className="form-control" 
                                id="logemail" 
                                type="text" 
                                value={this.state.logemail} 
                                onChange={this.handleChange}
                          required/>

                          <label for="logpwd">Password</label>
                          <input className="form-control" 
                                id="logpwd" 
                                type="text" 
                                value={this.state.logpwd} 
                                onChange={this.handleChange}
                          required/>
                        
                          <button className="btn btn-primary" 
                                id="log-btn" 
                                type="submit"
                                onClick={this.handleLogIn}
                                data-dismiss="modal"
                                >Submit</button>
                        </div>
                     </form>

                    </div>

                 </div>
                </div>                
            </div>   
        </div>
      </div>

       {/*  -----  Register Modal follows -------  */}

      <div className="modal" id="regModal" role="dialog">
            
        <div className="modal-dialog">
            
            {/*<!-- Modal content-->*/}
          <div className="modal-content">
            <div className="modal-header"> 
                <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

           <div className="modal-body"> 

                {/*<!-- Add User  -->*/}
            <div className="panel panel-primary">

                <div className="panel-heading">
                    <h3 className="panel-title" id="addUsr"><strong>New User Registration</strong></h3>
                </div>

                <div className="panel-body">

                    {/*<!-- Entry Form -->*/}
                    <form>
                      <div className="form-group">
                        <label for="regemail">eMail</label>
                        <input className="form-control" 
                               id="regemail" 
                               type="text" 
                               value={this.state.regemail} 
                               onChange={this.handleChange}
                               required/>
                                           
                        <label for="reguser">User Name</label>
                        <input className="form-control" 
                               id="reguser" 
                               type="text" 
                               value={this.state.reguser} 
                               onChange={this.handleChange}
                               required/>
                      
                    
                        <label for="regpwd">Password</label>
                        <input className="form-control" 
                               id="regpwd" 
                               type="text" 
                               value={this.state.regpwd} 
                               onChange={this.handleChange}
                               required/>
                       
                        <button className="btn btn-primary" 
                                id="register-btn" 
                                type="submit"
                                data-dismiss="modal"
                                onClick={this.handleRegister}
                                >Submit</button>
                      </div>
                    </form>
                       
                  </div>

                </div>
              </div>
                
            </div>   
           </div>
        </div>
        {/*  -----   Modal ends -------  */}

      </div>
);
}
});



// Export the component back for use in other files
module.exports = Main;