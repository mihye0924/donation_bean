import mysql from "mysql2";
import Dotenv from 'dotenv';
Dotenv.config();

const pool = mysql.createPool({ 
  host : process.env.DB_HOST, //db ip address
  port : process.env.DB_PORT, //db port number
  user : process.env.DB_USER, //db id
  password : process.env.DB_PASSWORD, //db password
  database: process.env.DB_DATABASE, //db schema name
});

export const db = pool.promise();
