const [Sequelize,Datatypes] = require('sequelize');
const dbhandler = new Sequelize('data', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

const carstable = dbhandler.define('cars', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
        manufacturersid: {
            type: Datatypes.STRING,
            allowNull: false
        },
        model: {
            type: Datatypes.STRING,
            allowNull: false
        },
        
        power: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        makeyear: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        tyresize: {
            type: Datatypes.STRING,
            allowNull: false
        }
});
const manufacturerstable = dbhandler.define('manufacturers', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
        name: {
            type: Datatypes.STRING,
            allowNull: false
        },
        power: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        launchyear: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
        country: {
            type: Datatypes.STRING,
            allowNull: false
        },
         makeyear: {
            type: Datatypes.INTEGER,
            allowNull: false
        }
});
const ownertable = dbhandler.define('owner', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
        carsid: {
            type: Datatypes.INTEGER,
            allowNull: false
        },
          name: {
            type: Datatypes.STRING,
            allowNull: false
        },
        address: {
            type: Datatypes.STRING,
            allowNull: false
        },
         birthyear: {
            type: Datatypes.INTEGER,
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