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
        dataHora: req.body.dataHora
    });

    res.json(ponto);
});




module.exports = router;