const express = require('express');
const app = express();
const cors = require ('cors');
const PORT = 3000;

const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');

const usuarioRotas = require('./routes/usuario');
const pontoRotas = require('./routes/ponto');

sequelize.sync({ alter: true })
.then(() => {
    console.log("BD sincronizado");
})
.catch(error => {
    console.log("Erro!");
});

Usuario.hasMany(Ponto, {
    foreignKey: "id_usuario"
});

Ponto.belongsTo(Usuario, {
    foreignKey: "id_usuario"
});


app.use(cors());
app.use(express.json());
app.use('/', usuarioRotas);
app.use('/', pontoRotas);


app.listen(PORT, () => {
    console.log("Servidor aguardando requisições");
});