// conexão com o banco de dados sqlite

const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/app.db'
})

//exportando o bd criado para ser usado em outro arquivo
module .exports = sequelize

