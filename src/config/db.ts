import { config } from "dotenv";
import { createPool } from "mysql2/promise";

config();
export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
});

export const initDB = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      create table if not exists schools (
        id int auto_increment primary key,
        name varchar(100),
        address varchar(100),
        latitude float,
        longitude float
      )
    `);
    console.log("Database initialized: 'school' table is ready.");
    connection.release();
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};
