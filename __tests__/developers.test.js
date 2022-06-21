const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('console routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/developers should show the list of developers', async () => {
    const resp = await request(app).get('/developers');
    expect(resp.body.length).toEqual(10);
    const sega = resp.body.find((developer) => developer.id === '1');
    expect(sega).toHaveProperty('name', 'Team Sonic');
  });

  afterAll(() => {
    pool.end();
  });
});
