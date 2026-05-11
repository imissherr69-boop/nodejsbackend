import express from "express";
import cors from "cors";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js";
import todoRouter from "./modules/todo/routes/todo.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();


app.use(errorHandler);
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Todo API is running 🚀");
});

export default app;