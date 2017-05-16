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
             email: "", stocklist: [] };
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
          // insert db posting here   !!!!!!!
          // var stocking = {sym: data.t, price: data.l, dtrade: data.lt};
          // console.log("stocking:" + stocking);
          // helpers.postStocking(stocking).then(function(resp) {

          //   console.log("comming back from helper.postStocking" + resp);

          // });

        }
        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));
    }
  },

  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  handleChange: function(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // When a user logs in...
  handleLogIn: function(event) {
    // preventing the form from trying to submit itself
    event.preventDefault();
    console.log("logmodal input:" + this.state.logemail + this.state.logpwd);
  
    var userInfo = {email: this.state.logemail, pwd: this.state.logpwd};
    console.log("userInfo:" + userInfo);

     helpers.getUser(userInfo).then((resp) => {

       console.log("comming back from helper.getUser" , resp);
       console.log(resp.useremail); // email address should be accessible here
       this.setState({ email: resp.useremail });

       // then use this email address to pass to util.helper to findall rows where email=email
       // populate an object to be PASSED stockapp.js as stocklist

       helpers.getHoldings(this.state.email).then((resp) => {
        console.log("comming back from helper.getHoldings" , resp);
        this.setState({ stocklist: resp });


       });  // getHoldings ends




      // at this point, use useremail to retrieve rows in Portfolio,
      // then build the stocklist array as object, then 
      // pass this.setState({stocklist: arrayOfportfolios})

     });

    // Clearing the input field after submitting
    this.setState({ logemail: "", logpwd: "" });
  },

  handleRegister: function(event) {
    // preventing the form from trying to submit itself
    event.preventDefault();
    console.log("regmodal input:" + this.state.regemail + this.state.reguser + this.state.regpwd);
  
    var userInfo = {name: this.state.reguser, email: this.state.regemail, pwd: this.state.regpwd};
    console.log("userInfo:" + userInfo);

     helpers.addUser(userInfo).then((resp) => {

       console.log("comming back from helper.addUser"); 

       console.log(resp.useremail);

       this.setState({ email: resp.useremail });

      // at this point, use useremail to retrieve rows in Portfolio,
      // then build the stocklist array as object, then 
      // pass this.setState({stocklist: arrayOfportfolios})

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
                <StockApp  Email={this.state.email} stocklist={this.state.stocklist}/>
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