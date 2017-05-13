module.exports = function(sequelize, DataTypes) {
	var History = sequelize.define("History", {
    ticker: DataTypes.STRING,
	  tickerprice: DataTypes.DECIMAL(5,2),
		lastrade: DataTypes.STRING,
	  createtmstmp: DataTypes.DATE
	},{timestamps: false});
	return History; 
};