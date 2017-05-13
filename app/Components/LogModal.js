var React = require("react");

var helpers = require("./utils/helpers");

var LogModal = React.createClass({

getInitialState: function() {
    return { logemail: "",  logpwd: "" };
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
    console.log("logmodal input:" + this.state.logemail + this.state.logpwd);
  
    var userInfo = {email: this.state.logemail, pwd: this.state.logpwd};
    console.log("userInfo:" + userInfo);

     helpers.getUser(userInfo).then(function(resp) {

       console.log("comming back from helper.getUser" + resp);

     });

    // Clearing the input field after submitting
    this.setState({ logemail: "", logpwd: "" });
  },


  // Here we describe this component's render method
  render: function() {
    return (

        <div className="modal fade" id="logModal" role="dialog">
            
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

                    {/*<!-- Entry Form -->*/}
                    <form onSubmit={this.handleSubmit}>
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
                                >Submit</button>
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
module.exports = LogModal;