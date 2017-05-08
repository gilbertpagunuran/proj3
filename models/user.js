module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
	  username: DataTypes.STRING,
      useremail: DataTypes.STRING,
      userpwd: DataTypes.STRING,
	  createtmstmp: DataTypes.DATE,
	},{timestamps: false});
	return User; 
};