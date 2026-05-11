import app from "./app.js";
import config from "./config/environment.js";

app.listen(config.port, () => {
  const docsUrl = config.isProduction
    ? "https://nodejsbackend-production-cc64.up.railway.app/api-docs"
    : `http://localhost:${config.port}/api-docs`;

  console.log(`🚀 Server is running on port ${config.port}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
  console.log(`📚 Swagger Documentation: ${docsUrl}`);
});