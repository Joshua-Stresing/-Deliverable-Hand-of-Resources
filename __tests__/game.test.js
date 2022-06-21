const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('company routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/games should show the list of games', async () => {
    const resp = await request(app).get('/games');
    expect(resp.body.length).toEqual(10);
    const sonic = resp.body.find((game) => game.id === '1');
    expect(sonic).toHaveProperty('name', 'Sonic');
  });

  afterAll(() => {
    pool.end();
  });
});
