module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("task", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        status: {
            type: DataTypes.ENUM('Personal', 'Outsourced', 'Claimed', 'In-Progress', 'Completed', 'Verified'),
            allowNull: false,
            defaultValue: 'Personal'
        },
        // Who claimed the task - User ID of Sparrow
        sparrow_id: {
            type: DataTypes.INTEGER
        },
        completed_time: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        deadline: {
            type: DataTypes.TIME,
            allowNull: false
        },
        offer_amount: {
            type: DataTypes.DECIMAL(10, 2)
        }
    });

//    Task.associate = function (models) {
//        // We're saying that a Task should belong to a User
//        // A Task can't be created without a User due to the foreign key constraint
//        Task.belongsTo(models.User, {
//            foreignKey: {
//                allowNull: false
//            }
//        });
//    };

    return Task;
};
