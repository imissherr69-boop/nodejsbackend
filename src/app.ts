import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

export default app;