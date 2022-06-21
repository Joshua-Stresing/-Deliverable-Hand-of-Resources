const { Router } = require('express');
const { Developer } = require('../models/Developer');

module.exports = Router()
  .get('/', async (req, res) => {
    const developerList = await Developer.getAll();
    res.json(developerList);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Developer.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Developer.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Developer.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Developer.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
