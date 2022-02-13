import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: Number(config.dbPort),
  max: 4,
});

pool.on("error", (err: Error) => console.error(err));

export default pool;
