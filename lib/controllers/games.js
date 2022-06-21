const { Router } = require('express');
const { Game } = require('../models/Game');

module.exports = Router()
  .get('/', async (req, res) => {
    const gameList = await Game.getAll();
    res.json(gameList);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Game.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
