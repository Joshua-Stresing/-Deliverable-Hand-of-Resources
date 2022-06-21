const pool = require('../utils/pool');

class Developer {
  id;
  name;
  established;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.established = row.established;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM developers');
    return rows.map((row) => new Developer(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from developers WHERE id = $1',
      [id]
    );
    return rows[0];
  }
}

module.exports = { Developer };
