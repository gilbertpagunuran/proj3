module.exports = function(sequelize, DataTypes) {
	var Portfolio = sequelize.define("Portfolio", {
      useremail: DataTypes.STRING,
      ticker: DataTypes.STRING,
      tickerdate: DataTypes.STRING,
      tickershares: DataTypes.INTEGER,
			tickerprice: DataTypes.DECIMAL(5,2),
	  createtmstmp: DataTypes.DATE,
	},{timestamps: false});
	return Portfolio; 
};