module.exports = (sequelize, DataTypes) => {
    const Link = sequelize.define('Link', {
      link: DataTypes.STRING,
      url: DataTypes.STRING,
    });

    Link.associate = function(models) {
        Link.belongsTo(models.User, {   
            onDelete: "CASCADE",
            foreignKey: "user_id",
            as: "user",
        });
    }

    return Link;
};