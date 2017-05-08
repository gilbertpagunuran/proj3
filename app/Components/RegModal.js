var React = require("react");

// Here we include all of the sub-components


// Helper Function
var helpers = require("./utils/helpers");

// This is the main component
var RegModal = React.createClass({

  getInitialState: function() {
    return { regemail: "", reguser: "", regpwd: "" };
  },

  handleChange: function(event) {
    // Here we create syntax to capture any change in text to the query terms (pre-search).
    // See this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  // When a user submits...
  handleSubmit: function(event) {
    // preventing the form from trying to submit itself
    event.preventDefault();
    console.log("regmodal input:" + this.state.regemail + this.state.reguser + this.state.regpwd);
  
    var userInfo = {name: this.state.reguser, email: this.state.regemail, pwd: this.state.regpwd};
    console.log("userInfo:" + userInfo);

     helpers.addUser(userInfo).then(function(resp) {

       console.log("comming back from helper.postUser" + resp);

     });

    // Clearing the input field after submitting
    this.setState({ regemail: "", reguser: "", regpwd: "" });
  },



  // Here we describe this component's render method
  render: function() {
    return (

        <div className="modal fade" id="regModal" role="dialog">
            
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
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label for="regemail">eMail</label>
                        <input className="form-control" id="regemail" type="text" value={this.state.regemail} onChange={this.handleChange}
                required/>
                     
                      
                        <label for="reguser">User Name</label>
                        <input className="form-control" id="reguser" type="text" value={this.state.reguser} onChange={this.handleChange}
                required/>
                      
                    
                        <label for="regpwd">Password</label>
                        <input className="form-control" id="regpwd" type="text" value={this.state.regpwd} onChange={this.handleChange}
                required/>
                       
                        <button className="btn btn-primary" id="register-btn" type="submit">Submit</button>
                         </div>
                    </form>
                       
                    </div>

                </div>
                </div>
                
            </div>   
            </div>
        </div>

    );

  }

});

// Export the component back for use in other files
module.exports = RegModal;