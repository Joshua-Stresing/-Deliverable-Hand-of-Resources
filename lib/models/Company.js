const pool = require('../utils/pool');

class Company {
  id;
  name;
  founded;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.founded = row.founded;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT id, name FROM video_game_company'
    );
    return rows.map((row) => new Company(row));
  }
}

module.exports = { Company };
