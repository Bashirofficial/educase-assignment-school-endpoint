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

app.get("/", (req, res) => {
  res.send(
    `<h2>🚀 Welcome to the School API!</h2>
    <p>✅ For testing the API endpoints, please use <strong>Postman</strong> or a similar API client.</p>
    <p>🔹 Only <code>GET</code> requests like <code>/api/v1/listSchools?latitude=lat&longitude=lon</code> can be tested directly in the browser. And lat and lon will be in numeric format.</p>
    <p>🔹 For <code>POST</code> requests like <code>/api/v1/addSchool</code>, use Postman workspace link that is being attached with the assignment docs for the best experience.</p>`
  );
});

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
