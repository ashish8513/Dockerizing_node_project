import express from "express";
import { config } from "dotenv";

config();

const NODE_ENV = process.env.NODE_ENV || "development";
const app = express();

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

app.all(/.*/, (_req, res) => {
    res.status(404).json({
        status: "error",
        message: "Resource not found",
    });
});


app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: "error",
        message: err.message || "Internal server error",
        ...(NODE_ENV === "development" && { stack: err.stack }),
    });
});

export default app;
