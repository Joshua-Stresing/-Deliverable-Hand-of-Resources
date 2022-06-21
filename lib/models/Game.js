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
}

module.exports = { Game };
