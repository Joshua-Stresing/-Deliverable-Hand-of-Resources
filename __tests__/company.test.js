const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('company routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/companies should show the list of companies', async () => {
    const resp = await request(app).get('/companies');
    expect(resp.body.length).toEqual(4);
    const sega = resp.body.find((company) => company.id === '1');
    expect(sega).toHaveProperty('name', 'Sega');
  });

  it('/companies/:id should return companies details', async () => {
    const resp = await request(app).get('/companies/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Sega',
      founded: 1960,
    });
  });

  it('POST /companies should add a new companies', async () => {
    const resp = await request(app).post('/companies').send({
      name: 'Sega',
      founded: 1960,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Sega');
    expect(resp.body.founded).toEqual(1960);
    expect(resp.body.id).not.toBeUndefined();
  });

  it('PUT /companies/:id should update', async () => {
    const resp = await request(app).put('/companies/1').send({ name: 'SEGA' });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('SEGA');
  });

  it('DELETE /companies/:id should delete a company', async () => {
    const resp = await request(app).delete('/companies/1');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/companies/1');
    expect(body).toEqual('');
  });

  afterAll(() => {
    pool.end();
  });
});
