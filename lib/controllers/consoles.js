const { Router } = require('express');
const { Console } = require('../models/Console');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Console.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Console.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Console.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Console.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res) => {
    const consoleList = await Console.getAll();
    res.json(consoleList);
  });
