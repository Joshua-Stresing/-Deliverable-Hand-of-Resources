const { Router } = require('express');
const { Company } = require('../models/Company');

module.exports = Router()
  .get('/', async (req, res) => {
    const companyList = await Company.getAll();
    res.json(companyList);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const data = await Company.getById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Company.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Company.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
