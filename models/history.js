module.exports = function(sequelize, DataTypes) {
	var History = sequelize.define("History", {
    ticker: DataTypes.STRING,
	  tickerprice: DataTypes.DECIMAL,
		lastrade: DataTypes.STRING,
	  createtmstmp: DataTypes.DATE
	},{timestamps: false});
	return History; 
};