const { Sequelize, DataTypes } = require('sequelize');
const dbhandler = new Sequelize('data', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

const carstable = dbhandler.define('cars', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
        manufacturersid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        power: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        makeyear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tyresize: {
            type: DataTypes.STRING,
            allowNull: false
        }
});
const manufacturerstable = dbhandler.define('manufacturers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        launchyear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
         makeyear: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
});
const ownertable = dbhandler.define('owner', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
        carsid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
          name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
         birthyear: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
});
carstable.hasMany(ownertable,{foreignKey:'carsid',sourceKey:'id'});
ownertable.belongsTo(carstable,{foreignKey:'carsid',targetKey:'id'});
manufacturerstable.hasMany(carstable,{foreignKey:'manufacturersid',sourceKey:'id'});
carstable.belongsTo(manufacturerstable,{foreignKey:'manufacturersid',targetKey:'id'});

exports.cars = carstable
exports.manufacturers = manufacturerstable
exports.owner = ownertable