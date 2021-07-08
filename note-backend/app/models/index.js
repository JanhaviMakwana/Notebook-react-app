const dbConfig = require('../config/database.config');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

db.user = require('./user')(sequelize, Sequelize);
db.note = require('./note')(sequelize, Sequelize);
db.tag = require('./tag')(sequelize, Sequelize);

db.user.hasMany(db.note);
db.note.belongsTo(db.user);
db.note.hasMany(db.tag);
module.exports = db;