const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('console routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/company should show the list of companies', async () => {
    const resp = await request(app).get('/companies');
    expect(resp.body.length).toEqual(4);
    const sega = resp.body.find((company) => company.id === '1');
    expect(sega).toHaveProperty('name', 'Sega');
  });
});
