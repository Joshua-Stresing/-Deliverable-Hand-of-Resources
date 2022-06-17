const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('console routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/consoles should show the list of consoles', async () => {
    const resp = await request(app).get('/consoles');
    expect(resp.body.length).toEqual(5);
    const atari = resp.body.find((console) => console.id === '1');
    expect(atari).toHaveProperty('name', 'Atari');
  });

  it('/consoles should return console details', async () => {
    const resp = await request(app).get('/consoles/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Atari',
      description: 'Classically viewed as the original game console.',
      released: 1977,
    });
  });

  it('PUT /consoles/:id should update', async () => {
    const resp = await request(app).put('/consoles/2').send({ name: 'N.E.S' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('N.E.S');
  });

  it('DELETE /consoles/:id should delete a console', async () => {
    const resp = await request(app).delete('/consoles/1');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/consoles/1');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
