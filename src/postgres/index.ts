import {Pool} from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
});

pool.query(
  'CREATE TABLE IF NOT EXISTS "user" ( username text, password text );',
  (err, res) => {
    console.log(res, err);
  }
);

module.exports = {
  query: (text: string, params: string[], callback: () => void) => {
    return pool.query(text, params, callback);
  },
};
