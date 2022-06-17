const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('console routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('DELETE /consoles/:id should delete a console', async () => {
    const resp = await request(app).delete('/consoles/1');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/consoles/1');
    expect(body).toEqual(null);
  });

  it('/consoles should show the list of consoles', async () => {
    const res = await request(app).get('/consoles');
    expect(res.body.length).toEqual(5);
    const atari = res.body.find((console) => console.id === '1');
    expect(atari).toHaveProperty('name', 'Atari');
  });

  afterAll(() => {
    pool.end();
  });
});
