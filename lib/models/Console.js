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
}

module.exports = { Console };
