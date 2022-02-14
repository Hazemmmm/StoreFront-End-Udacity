import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import config from "./config";
import db from "./database";
import routes from "./routes";

const port = config.port || 3000;

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response): void => {
  res.send("Hello World!");
});

db.connect().then((client) => {
  return client
    .query("SELECT NOW()")
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});

app.use("/api", routes);

app.listen(port, (): void => {
  console.log(`starting app on: ${port}`);
});

export default app;
