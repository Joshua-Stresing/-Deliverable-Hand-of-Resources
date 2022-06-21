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

  static async insert({ name, founded }) {
    const { rows } = await pool.query(
      'INSERT INTO video_game_company (name, founded) VALUES ($1, $2) RETURNING *',
      [name, founded]
    );
    return new Company(rows[0]);
  }

  static async updateById(id, attrs) {
    const company = await Company.getById(id);
    if (!company) return null;
    const { name, founded } = { ...company, ...attrs };
    const { rows } = await pool.query(
      `
        UPDATE  video_game_company
        SET name=$2, founded=$3
        WHERE id=$1 RETURNING *`,
      [id, name, founded]
    );
    return new Company(rows[0]);
  }
}

module.exports = { Company };
