const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');


// Rota que retorna TODOS os usuários da aplicação
router.get('/usuarios', async (req, res) => {
    // Como tratar erro (try/catch)?
    
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


// Rota que busca um usuário específico 
router.get('/usuario/:id_usuario', async (req, res) => {
    const usuario = await Usuario.findAll({
        where: {
          id_usuario: req.params.id_usuario
        },
    });

    res.json(usuario);
});


// Rota que cria um usuário
router.post('/usuario', async (req, res) => {
    // Fazer isso em formato de desestruturação
    // {nome, email ...} = req.body
    const usuario = await Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        login: req.body.login,
        senha: req.body.senha,
        permissao: req.body.permissao
    });
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
    res.status(201).json(usuario);
});

// Rota para deletar um usuário específico (id)
router.delete('/usuario/:id_usuario', async (req, res) => {
    const id_usuario = req.params.id_usuario;

    const usuario = await Usuario.findByPk(id_usuario);

    if(!usuario) {
       // retornar um erro com status adequado
       return res.send("Erro ao deletar usuário"); 
    }

    await usuario.destroy();
    res.send("Usuário deletado com sucesso");
});


// Editar atributos do usuário id
router.put('/usuario/:id_usuario', async (req, res) => {

    const id_usuario = req.params.id_usuario;
    const { nome, email, login, senha, permissao } = req.body;

    const usuario = await Usuario.findByPk(id_usuario);

    if(!usuario) {
        return res.send("Erro ao editar usuário");
    }

    usuario.update({ nome, email, login, senha, permissao });
    res.send("Usuário editado com sucesso");
});

module.exports = router;