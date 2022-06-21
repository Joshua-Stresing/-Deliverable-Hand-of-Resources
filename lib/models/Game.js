const pool = require('../utils/pool');

class Game {
  id;
  name;
  released;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name FROM games');
    return rows.map((row) => new Game(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from games WHERE id = $1', [
      id,
    ]);
    return rows[0];
  }
}

module.exports = { Game };
