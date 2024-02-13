import mysql from "mysql";
require("dotenv").config();

const options = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  insecureAuth: true,
};

export const connectDB = mysql.createPool(options);

if(connectDB){
    console.log("connect db successfully !");
}
