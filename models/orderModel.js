import { db } from '../database.js';

export class Order {
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0];
    }

    static async save(order) {
        const [result] = await db.query('INSERT INTO orders SET ?', order);
        return result.insertId;
    }

    static async updateStatus(id, status) {
        await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
        return this.findById(id);
    }
}
