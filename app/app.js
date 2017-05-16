// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the Main Component
var Logon = require("./components/Logon");
var Main = require("./components/Main");

// This code here allows us to render our main component (in this case Main)
ReactDOM.render(
<div className="main-container">
    <Logon />
    <Main />
</div>
, document.getElementById("app")
);