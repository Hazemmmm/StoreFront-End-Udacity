import UserModel from "../../models/user.model";
import User from "../../types/user.types";
import db from "../../database";

const userModel = new UserModel();

describe("UserModel Defined", () => {
  describe("Test that User Methods has defined", () => {
    it("Should have index method", () => {
      expect(userModel.index).toBeDefined();
    });
    it("Should have getById method", () => {
      expect(userModel.getById).toBeDefined();
    });
    it("Should have createUser method", () => {
      expect(userModel.createUser).toBeDefined();
    });
    it("Should have updateUser method", () => {
      expect(userModel.updateUser).toBeDefined();
    });
    it("Should have deleteUser method", () => {
      expect(userModel.deleteUser).toBeDefined();
    });
    it("Should have authenticate method", () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe("UserModel Functionality Logic", () => {
    const user = {
      first_name: "Hazem_test_2",
      last_name: "Mohamed_test_2",
      email: "test23@gmail.com",
      password: "tes2t1@12345",
    } as User;

    it("User Mdodel Create Method should return a new user created", async () => {
      const newUser = await userModel.createUser(user);
      expect(newUser.first_name).toEqual("Hazem_test_2");
      expect(newUser.last_name).toEqual("Mohamed_test_2");
      expect(newUser.email).toEqual("test23@gmail.com");
    });

    it("USer Model Authenticate Method return The Authorized USer", async () => {
      const authUser = await userModel.authenticate(
        "test23@gmail.com",
        "tes2t1@12345"
      );
      if (authUser) {
        expect(authUser.email).toBe("test23@gmail.com");
        expect(authUser.first_name).toBe("Hazem_test_2");
        expect(authUser.last_name).toBe("Mohamed_test_2");
      }
    });

    it("USer Model Index Method Should return all users", async () => {
      const allUsers = await userModel.index();
      expect(allUsers.length).toBeGreaterThanOrEqual(1);
    });
    it("USer Model GetById Method Should return the Specificied users by Id", async () => {
      const specUser = await userModel.getById(1);
      expect(specUser.email).toBe("test23@gmail.com");
      expect(specUser.first_name).toBe("Hazem_test_2");
      expect(specUser.last_name).toBe("Mohamed_test_2");
    });

    it("USer Model Update Method should Update Exisiting User", async () => {
      const userUpdated = {
        first_name: "Updated_Hazem_test_3",
        last_name: "Updated_Mohamed_test_3",
        password: "Updated_test1@12345",
        email: "Updated_test3@gmail.com",
        id: 1,
      };
      const updatedUser = await userModel.updateUser(userUpdated);
      expect(updatedUser.first_name).toBe("Updated_Hazem_test_3");
      expect(updatedUser.email).toBe("Updated_test3@gmail.com");
    });

    it("USer Model Delete Method Should remoe user from DB", async () => {
      const deletedUser = await userModel.deleteUser(1);
      expect(deletedUser.id).toBe(1);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        "DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;";
      await connection.query(sql);
      connection.release();
    });
  });
});
