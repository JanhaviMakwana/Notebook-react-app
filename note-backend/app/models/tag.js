const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define('tag', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
            }
        },
        updatedAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
            }
        }
    });

    return Tag;
};