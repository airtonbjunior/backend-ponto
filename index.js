const express = require('express');
const app = express();
const PORT = 3000;

const sequelize = require('./config/db');
const Usuario = require('./models/usuario');
const Ponto = require('./models/ponto');


sequelize.sync({ alter: true })
.then(() => {
    console.log("BD sincronizado");
})
.catch(error => {
    console.log("Erro!");
});


//Usuario.create({ nome: "eeee", login: "e", email: "sdfg", senha: "sdfg", permissao: "usuario"});


// Rota que retorna TODOS os usuários da aplicação
app.get('/usuarios', async (req, res) => {
    // Como tratar erro (try/catch)?
    
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


// Rota que busca um usuário específico 
app.get('/usuario/:id_usuario', async (req, res) => {
    const usuario = await Usuario.findAll({
        where: {
          id_usuario: req.params.id_usuario
        },
    });

    res.json(usuario);
});


// Rota que cria um usuário
app.post('/usuario', async (req, res) => {
    /* 
    os parâmetros de criação de usuário devem ser enviados
    no body da requisição

    req.body contém os dados do body da requisição

    parâmetros obrigatórios:
    nome, email, senha, login, permissao('usuario' ou 'administrador')

    O método create cria um recurso no bd
    Usuario.create({}); passando como parâmetro o objeto com os valores
    */
});



app.listen(PORT, () => {
    console.log("Servidor aguardando requisições");
});