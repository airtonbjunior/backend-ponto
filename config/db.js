// Configuração do Banco de Dados
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('ponto', 'postgres', 'ceub123456', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize;