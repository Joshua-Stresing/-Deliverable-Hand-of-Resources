const { Router } = require('express');
const { Char } = require('../models/Chars');

module.exports = Router()
  .get('/', async (req, res) => {
    const charList = await Char.getAll();
    res.json(charList);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Char.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
