import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: Number(config.dbPort),
});

pool.on("error", (err: Error) => console.error(err.message));

export default pool;
