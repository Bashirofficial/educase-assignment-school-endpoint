import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import schoolRoutes from "./src/routes/school.routes.js";
import { ApiError } from "./src/utils/ApiError.js";
import pool from "./src/db/index.js";

dotenv.config();

const app = express();

pool
  .getConnection()
  .then(() => console.log("MySQL is being successfully connected"))
  .catch((err) => {
    console.error("MySQL connection has been failed:", err);
    process.exit(1);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1/", schoolRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      errors: err.errors || [],
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
