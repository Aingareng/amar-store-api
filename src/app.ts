import express, { Request, Response } from "express";
import { Employee } from "./models";
import router from "./routes/router";
import employeeRoute from "./routes/handlers/employee";
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());
app.use("/api", router("/employees", employeeRoute()));

export default app;
