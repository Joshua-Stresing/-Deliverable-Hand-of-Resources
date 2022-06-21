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

  static async insert({ name, established }) {
    const { rows } = await pool.query(
      'INSERT INTO developers (name, established) VALUES ($1, $2) RETURNING *',
      [name, established]
    );
    return new Developer(rows[0]);
  }

  static async updateById(id, attrs) {
    const developer = await Developer.getById(id);
    if (!developer) return null;
    const { name, established } = { ...developer, ...attrs };
    const { rows } = await pool.query(
      `
        UPDATE  developers
        SET name=$2, established=$3
        WHERE id=$1 RETURNING *`,
      [id, name, established]
    );
    return new Developer(rows[0]);
  }
}

module.exports = { Developer };
