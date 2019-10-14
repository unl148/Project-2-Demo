module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  User.associate = function(models) {
    models.User.hasMany(models.Thought, {
      onDelete: "cascade"
    });
  };

  return User;
};
