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

  Category.associate = function(models) {
    models.Category.hasMany(models.Thought, {
      onDelete: "cascade"
    });
  };
  return Category;
};
