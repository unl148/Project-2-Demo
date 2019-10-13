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
    }
  });
  return Thought;
};
