const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
    {
    // Manually define the primary key
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    text: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
    },
    {
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: "post",
    }
);

module.exports = Post;