import Order from "../types/order.types";
import db from "../database";

class OrderModel {
  //create
  async createOrder(order: Order): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql =
        "INSERT INTO orders (status, user_id) values($1, $2) RETURNING *";
      const result = await connection.query(sql, [order.status, order.user_id]);
      connection.release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Can't create Order ${error.message}`);
    }
  }
  //update
  async updateOrder(order: Order): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql =
        "UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *";
      const result = await connection.query(sql, [
        order.status,
        order.user_id,
        order.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`can't update order Errror: ${error.message}`);
    }
  }
  //delete
  async deleteOrder(id: number): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`can't delete Order Id ${id}`);
    }
  }
  //getAll()
  async getAllOrders(): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM orders";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error: any) {
      throw new Error(`can't get all Order ${error.message}`);
    }
  }
  //getById
  async getOrderById(id: number): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`can't get order id: ${id}`);
    }
  }

  //getOrderByUserId
  async getOrderByUserId(id: number): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Can't get Order by user Id: ${id}`);
    }
  }
}

export default OrderModel;
