const pool = require('../utils/pool');

class Char {
  id;
  name;
  description;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM chars');
    return rows.map((row) => new Char(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from chars WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }

  static async insert({ name, description }) {
    const { rows } = await pool.query(
      'INSERT INTO chars (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return new Char(rows[0]);
  }

  static async updateById(id, attrs) {
    const char = await Char.getById(id);
    if (!char) return null;
    const { name, description } = { ...char, ...attrs };
    const { rows } = await pool.query(
      `
        UPDATE chars
        SET name=$2, description=$3
        WHERE id=$1 RETURNING *`,
      [id, name, description]
    );
    return new Char(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM chars WHERE id = $1 RETURNING *',
      [id]
    );
    return new Char(rows[0]);
  }
}

module.exports = { Char };
