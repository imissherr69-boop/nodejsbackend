import app from "./app.js";
import config from "./config/environment.js";

app.listen(config.port, () => {
  console.log(`🚀 Server is running on port ${config.port}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`📚 Swagger Documentation: http://localhost:${config.port}/api-docs`);
});