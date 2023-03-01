const { DataTypes } = require("sequelize");
const {sequelize} = require("../../../mysql/connect");

const Collection = sequelize.define('collections', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
})
sequelize.sync().then(() => {
    console.log('Collection table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
module.exports.Collection = Collection