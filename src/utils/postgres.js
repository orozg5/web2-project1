import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.REACT_APP_PG_USER,
  host: process.env.REACT_APP_PG_HOST,
  database: process.env.REACT_APP_PG_DB,
  password: process.env.REACT_APP_PG_PASS,
  port: 5432,
});

export const queryDatabase = async (query, params = []) => {
  try {
    const data = await pool.query(query, params);
    return data.rows;
  } catch (err) {
    console.error(err);
  }
};
