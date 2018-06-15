module.exports = (sequelize, DataTypes) => {
    let Message = sequelize.define("message", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            required: true
        },
        roomId: {
            type: DataTypes.STRING,
            required: true
        },
        userId: {
            type: DataTypes.UUID,
            required: true
        },
        name: {
            type: DataTypes.STRING,
            required: true
        },
        message: {
            type: DataTypes.STRING,
            required: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at:  DataTypes.DATE,
        deleted_at: DataTypes.DATE,
        deleted_by: DataTypes.STRING
    }, {
        paranoid: true,
        underscored: true
    });

    return Message;
};
