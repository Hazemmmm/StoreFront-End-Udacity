import dotenv from "dotenv";

dotenv.config();
const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV,
  POSTGRES_DB_TEST,
  SALT_ROUND,
  BCRYPRT_PASSWORD,
  TOKEN_SECRET,
} = process.env;

export default {
  port: PORT,
  host: POSTGRES_HOST,
  dbPort: POSTGRES_PORT,
  database: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  salt: SALT_ROUND,
  pepper: BCRYPRT_PASSWORD,
  token: TOKEN_SECRET,
};
