import { attachControllers } from "@decorators/express";
import express, { Request, Response } from "express";
import { HealthController } from "./src/controllers/health.controller";
import connectDB from './db/database';

import { SwaggerConfig, generateDocumentation } from "typescript-swagger";
import path from "path";

import * as packageJson from './package.json';
import * as tsConfig from './tsconfig.json';
import { UserController } from "./src/controllers/user.controller";
import bodyParser from "body-parser";
// Create a new express application instance
const app = express();
connectDB();
// Set the network port
const port = process.env['PORT'] || 3000;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// app.use("/public", express.static(path.join(__dirname, "public")));
// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
});
attachControllers(app, [HealthController, UserController]);

export const swaggerConfig: SwaggerConfig = {
    yaml: true,
    name: 'API - Documentation',
    description: packageJson.description,
    basePath: '/',
    version: packageJson.version,
    outputDirectory: 'public',
    entryFile: path.join('src', 'controllers', '**', '*.ts'),
    decoratorConfig: {
        useBuildIn: true,
        useLibrary: ["@decorators/express"],
        // useLibrary: ["typescript-rest", "@decorators/express"],
    },
    ignore: ['**/node_modules/**'],
    consumes: ['application/json'],
    produces: ['application/json']
}

export async function generateSwaggerDocumentation(): Promise<void> {
    await generateDocumentation(swaggerConfig, tsConfig as any);
}
generateSwaggerDocumentation();

// app.listen(3000);
// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});