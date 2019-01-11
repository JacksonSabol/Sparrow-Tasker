module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define('User', {
        firstName: {
            type: sequelize.STRING,
            notEmpty: true
        },
        lastName: {
            type: sequelize.STRING,
            notEmpty: true
        },
        rating: {
            type: sequelize.INTEGER
        },
        balance: {
            type: sequelize.DECIMAL(10, 2)
        }
    });
    User.associate = function (models) {
        // We're saying that a User should belong to an authorized account
        // A User can't be created without an authorized account due to the foreign key constraint
        User.belongsTo(models.Auth, {
            foreignKey: {
                allowNull: false
            }
        });
        // Associating User with Tasks
        // When an User is deleted, also delete any associated Tasks
        User.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };

    return User;

}