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

  it('/developers/:id should return developers details', async () => {
    const resp = await request(app).get('/developers/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Team Sonic',
      established: 1990,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
