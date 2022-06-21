const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('char routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/chars should show the list of chars', async () => {
    const resp = await request(app).get('/chars');
    expect(resp.body.length).toEqual(2);
    const cloud = resp.body.find((char) => char.id === '1');
    expect(cloud).toHaveProperty('name', 'Cloud');
  });

  it('/chars/:id should return chars details', async () => {
    const resp = await request(app).get('/chars/1');
    // expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Cloud',
      description: 'Lead character of Final Fantasy 7',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
