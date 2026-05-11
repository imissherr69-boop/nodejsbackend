import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js";
import todoRouter from "./modules/todo/routes/todo.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import config from "./config/environment.js";

const app = express();

// Security Middleware
app.use(helmet());

// Rate Limiting (Anti-abuse protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

// Logging Middleware
app.use(morgan(config.isDevelopment ? "dev" : "combined"));

// Body Parser
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/todos", todoRouter);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Todo API is running 🚀",
    environment: config.nodeEnv,
    version: "1.0.0",
  });
});

// Error Handling Middleware (must be last)
app.use(errorHandler);

export default app;