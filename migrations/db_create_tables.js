require('dotenv').config({path: '../.env'});

const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
});

const SQL_CREATE_TABLE_USER = `
    CREATE TABLE IF NOT EXISTS "user" (
        username text,
        password text
    );
`;

pool
  .query(SQL_CREATE_TABLE_USER)
  .then(res => {
    console.log('SUCCESS: the "user" table is created');
    console.log(res);
  })
  .catch(err => {
    console.log('ERROR: at the "user" table creating');
    console.log(err);
  });
