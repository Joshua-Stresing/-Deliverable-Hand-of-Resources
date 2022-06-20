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

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * from video_game_company WHERE id = $1',
      [id]
    );
    return rows[0];
  }
}

module.exports = { Company };
