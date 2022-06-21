const { Router } = require('express');
const { Developer } = require('../models/Developer');

module.exports = Router().get('/', async (req, res) => {
  const developerList = await Developer.getAll();
  res.json(developerList);
});
