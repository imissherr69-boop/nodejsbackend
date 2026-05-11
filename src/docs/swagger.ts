import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "../config/environment.js";

const swaggerServerUrl =
  process.env.SWAGGER_SERVER_URL ||
  (config.isProduction
    ? "https://nodejsbackend-production-cc64.up.railway.app"
    : `http://localhost:${config.port}`);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Backend Todo API for Flutter & React test",
    },
    servers: [
      {
        url: swaggerServerUrl,
      },
    ],
  },
  apis: ["./src/modules/**/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };