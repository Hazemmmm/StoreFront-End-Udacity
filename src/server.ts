import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import config from "./config";

const port = config.port || 3000;

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response): void => {
  res.send("Hello World!");
});

app.listen(port, (): void => {
  console.log(`starting app on: ${port}`);
});

export default app;
