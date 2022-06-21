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

  it('/games/:id should return games details', async () => {
    const resp = await request(app).get('/games/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Sonic',
      released: 1991,
    });
  });

  it('POST /games should add a new games', async () => {
    const resp = await request(app).post('/games').send({
      name: 'Sonic',
      released: 1991,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Sonic');
    expect(resp.body.released).toEqual(1991);
    expect(resp.body.id).not.toBeUndefined();
  });

  afterAll(() => {
    pool.end();
  });
});
