const pool = require('../utils/pool');

class Console {
  id;
  name;
  description;
  released;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM consoles');
    return rows.map((row) => new Console(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from consoles WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM consoles WHERE id = $1 RETURNING *',
      [id]
    );
    return new Console(rows[0]);
  }
}

module.exports = { Console };
