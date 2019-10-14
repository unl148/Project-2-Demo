module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Category;
};
