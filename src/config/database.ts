import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "root";
const dbPass = process.env.DB_PASS || "";
const dbName = process.env.DB_NAME || "test";
const dbPort = Number(process.env.DB_PORT) || 3306;
const dbDialect =
  (process.env.DB_DIALECT as "mysql" | "mariadb" | "postgres" | "mssql") ||
  "mysql";

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDialect,
  port: dbPort,
  pool: {
    max: 10,
    min: 2,
    acquire: 60000,
    idle: 30000,
  },
  // retry: {
  //   match: [/Deadlock/i, Sequelize.ConnectionAcquireTimeoutError],
  //   max: 3,
  // },
  logging: (msg) => console.log(msg),
});

// Test connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected...");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });
