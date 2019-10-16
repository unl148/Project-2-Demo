module.exports = function(sequelize, DataTypes) {
  var Thought = sequelize.define("Thought", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    notes: DataTypes.TEXT,
    dateTime: {
      type: DataTypes.DATE
      // , allowNull: false
    }
  });

  Thought.associate = function(models) {
    models.Thought.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Thought.associate = function(models) {
    models.Thought.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Thought;
};
