import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch((err) => console.error("Error connecting to MySQL:", err));

sequelize.sync({ alter: true }).then(() => console.log("Database synced"));

app.use("/api", movieRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
