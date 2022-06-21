const { Router } = require('express');
const { Game } = require('../models/Game');

module.exports = Router().get('/', async (req, res) => {
  const gameList = await Game.getAll();
  res.json(gameList);
});
