import { attachControllers } from "@decorators/express";
import express, { Request, Response } from "express";
import { HealthController } from "./health.controller";

// Create a new express application instance
const app = express();

// Set the network port
const port = process.env['PORT'] || 3000;

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});
attachControllers(app, [HealthController]);

app.listen(3000);
// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});