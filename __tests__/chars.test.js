const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('company routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/chars should show the list of chars', async () => {
    const resp = await request(app).get('/chars');
    expect(resp.body.length).toEqual(2);
    const cloud = resp.body.find((char) => char.id === '1');
    expect(cloud).toHaveProperty('name', 'Cloud');
  });

  afterAll(() => {
    pool.end();
  });
});
