const config = require('./app');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.pgDatabase,config.pgUsername,config.pgPassword,{
    host: config.pgHost,
    dialect: 'postgres',
    raw:true,
    port: config.pgPort,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases:true
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to postgres database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize