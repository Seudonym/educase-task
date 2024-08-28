import { Request, Response } from "express";
import { pool } from "../config/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import SchoolSchema from "../models/school";

export const getAllSchools = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection(); 
    const result = await connection.query("select * from schools");
    connection.release();
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
    throw error;
  }
};

export const addSchool = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const { name, address, latitude, longitude } = req.body;
    const [result]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
      "insert into schools (name, address, latitude, longitude) values (?, ?, ?, ?)",
      [name, address, latitude, longitude],
    );
    return res.status(200).json({ schoolId: result.insertId });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
    throw error;
  }
};
