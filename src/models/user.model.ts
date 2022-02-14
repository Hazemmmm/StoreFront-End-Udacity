import User from "../types/user.types";
import db from "../database";
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
  //create
  //update
  //delete
  //authenticate
}

export default UserModel;
