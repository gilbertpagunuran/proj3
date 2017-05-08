module.exports = function(sequelize, DataTypes) {
	var Portfolio = sequelize.define("Portfolio", {
	  username: DataTypes.STRING,
      useremail: DataTypes.STRING,
      ticker: DataTypes.STRING,
      tickerdate: DataTypes.DATE,
      tickershares: DataTypes.INTEGER,
			tickerprice: DataTypes.DECIMAL,
	  createtmstmp: DataTypes.DATE,
	},{timestamps: false});
	return Portfolio; 
};