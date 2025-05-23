import express from "express";
import router from "./routes/router";
import employeeRoute from "./routes/handlers/employee";
import cors from "cors";
import criteriaRoute from "./routes/handlers/criteria";
import loginRoute from "./routes/handlers/login";
import skillCriteriaRoute from "./routes/handlers/skillCriteria";
import leadershipCriteriaRoute from "./routes/handlers/leadershipCriteria";

const app = express();

// Middleware untuk parsing JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router("/employees", employeeRoute()));
app.use("/api", router("/criterias", criteriaRoute()));
app.use("/api", router("/login", loginRoute()));
app.use("/api", router("/skill-criteria", skillCriteriaRoute()));
app.use("/api", router("/leadership-cirteria", leadershipCriteriaRoute()));

export default app;
