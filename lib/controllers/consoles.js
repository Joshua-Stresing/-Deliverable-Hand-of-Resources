const { Router } = require('express');
const { Console } = require('../models/Console');

module.exports = Router().get('/', async (req, res) => {
  const consoleList = await Console.getAll();
  // console.log(consoleList);
  res.json(consoleList);
});
