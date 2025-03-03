import express from "express";
import router from "./routes/router";
import employeeRoute from "./routes/handlers/employee";
import cors from "cors";
import criteriaRoute from "./routes/handlers/criteria";
const app = express();

// Middleware untuk parsing JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router("/employees", employeeRoute()));
app.use("/api", router("/settings", criteriaRoute()));

export default app;
