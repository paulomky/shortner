module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    });

    User.associate = function(models) {
        User.hasMany(models.Link, {
            onDelete: "CASCADE",
            foreignKey: "user_id",
            as: "links",
        });
    }

    return User;
};