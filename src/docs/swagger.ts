import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
        url: "/",
      },
    ],
  },
  apis: ["./src/modules/**/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };