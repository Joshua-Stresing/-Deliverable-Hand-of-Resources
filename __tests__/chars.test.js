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

  it('POST /chars should add a new chars', async () => {
    const resp = await request(app).post('/chars').send({
      name: 'Cloud',
      description: 'Lead character of Final Fantasy 7',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Cloud');
    expect(resp.body.description).toEqual('Lead character of Final Fantasy 7');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /chars/:id should update', async () => {
    const resp = await request(app)
      .put('/chars/1')
      .send({ name: 'Cloud Strife' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Cloud Strife');
  });

  it('DELETE /chars/:id should delete a chars', async () => {
    const resp = await request(app).delete('/chars/1');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/chars/1');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
