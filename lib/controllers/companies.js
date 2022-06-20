const { Router } = require('express');
const { Company } = require('../models/Company');

module.exports = Router().get('/', async (req, res) => {
  const companyList = await Company.getAll();
  // console.log(consoleList);
  res.json(companyList);
});
