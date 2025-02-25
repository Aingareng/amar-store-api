import express from "express";
import router from "./routes/router";
import employeeRoute from "./routes/handlers/employee";
import cors from "cors";
const app = express();

// Middleware untuk parsing JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router("/employees", employeeRoute()));

export default app;
