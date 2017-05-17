module.exports = function(sequelize, DataTypes) {
	var Portfolio = sequelize.define("Portfolio", {
      useremail: DataTypes.STRING,
      ticker: DataTypes.STRING,
      tickerdate: DataTypes.STRING,
      tickershares: DataTypes.INTEGER,
			tickerprice: DataTypes.DECIMAL(15,2),
			broker: DataTypes.STRING,
	  createtmstmp: DataTypes.DATE,
	},{timestamps: false});
	return Portfolio; 
};