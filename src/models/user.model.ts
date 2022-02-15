import User from "../types/user.types";
import db from "../database";
import bcrypt from "bcrypt";
import config from "../config";

class UserModel {
  //get all
  async index(): Promise<User[]> {
    try {
      const connection = db.connect();
      const sql = "SELECT * FROM users";
      const result = await (await connection).query(sql);
      (await connection).release();
      return result.rows;
    } catch (err: any) {
      throw new Error(`Can't get users from DB${err.message}`);
    }
  }
  //get by id1
  async getById(id: number): Promise<User[]> {
    try {
      const connection = db.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await (await connection).query(sql, [id]);
      (await connection).release();
      return result.rows[0];
    } catch (err: any) {
      throw new Error(`Can't get user ${id}, ${err.message}`);
    }
  }
  //create
  async createUser(user: User): Promise<User> {
    try {
      const connection = db.connect();
      const sql =
        "INSERT INTO users (first_name,last_name,password,email) values ($1, $2, $3, $4) returning id,first_name,last_name,email";

      const result = await (
        await connection
      ).query(sql, [
        user.first_name,
        user.last_name,
        hashPassword(user.password),
        user.email,
      ]);
      (await connection).release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Can't create users ${error.message}`);
    }
  }
  //update
  async updateUser(user: User): Promise<User> {
    try {
      const connection = db.connect();
      const sql =
        "UPDATE users SET first_name=$1, last_name=$2, password=$3, email=$4 WHERE id=$5 RETURNING *";
      const result = await (
        await connection
      ).query(sql, [
        user.first_name,
        user.last_name,
        hashPassword(user.password),
        user.email,
        user.id,
      ]);
      (await connection).release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Can't Update user ${user.first_name + user.last_name} ,error is: ${
          error.message
        }`
      );
    }
  }
  //delete
  async deleteUser(id: number): Promise<User> {
    try {
      const connection = db.connect();
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const result = await (await connection).query(sql, [id]);
      (await connection).release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Couldn't delete user Id: ${id}, Error: ${error.message}`
      );
    }
  }
  //authenticate
}

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as unknown as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
export default UserModel;
