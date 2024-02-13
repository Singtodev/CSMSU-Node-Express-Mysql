import express from "express";
import bodyParser from "body-parser";
import { router as index } from "./routes";
import { router as trip } from "./routes/trip";

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: " A simple api documentation",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["app.ts"],
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/", index);
app.use("/trip", trip);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
