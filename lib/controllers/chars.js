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
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Char.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Char.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
