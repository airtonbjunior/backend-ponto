const express = require('express');
const router = express.Router();
const Ponto = require('../models/ponto');


// Retorna todos os pontos
router.get('/pontos', async (req, res) => {
    const pontos = await Ponto.findAll();

    res.json(pontos);
});


// Retorna um ponto específico (id_ponto)
router.get('/ponto/:id_ponto', async (req, res) => {

    const ponto = await Ponto.findByPk(req.params.id_ponto);

    // E se o ponto não existir?

    res.json(ponto);

});


// Cria um ponto (dados no body)
router.post('/ponto', async (req, res) => {

    const ponto = await Ponto.create({
        tipo: req.body.tipo,
        dataHora: req.body.dataHora,
        id_usuario: req.body.id_usuario
    });

    res.json(ponto);
});


// Edita um ponto específico (id_ponto)
router.put('/ponto/:id_ponto', async (req, res) => {

    const ponto = await Ponto.findByPk(req.params.id_ponto);

    const pontoAtualizado = await ponto.update({
        tipo: req.body.tipo,
        dataHora: req.body.dataHora
    });

    res.json(pontoAtualizado);
});


// Rota que deleta um ponto específico (id_ponto)
router.delete('/ponto/:id_ponto', async (req, res) => {

    const ponto = await Ponto.findByPk(req.params.id_ponto);

    // e se der erro no destroy() ?
    ponto.destroy();

    res.send(`Ponto com id ${req.params.id_ponto} deletado com sucesso`);
});



// Rota que retorna todos os pontos vinculados ao usuário id_usuario
router.get('/pontos/usuario/:id_usuario', async (req, res) => {

    const pontos = await Ponto.findAll({
        where: {
            id_usuario: req.params.id_usuario
        }
    });

    res.json(pontos);

});

module.exports = router;