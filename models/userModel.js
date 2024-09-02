import { db } from '../database.js';
import bcrypt from 'bcrypt';

// User model
export class User {
    // Find user by ID
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    // Save a new user
    static async save(user) {
        const [result] = await db.query('INSERT INTO users SET ?', user);
        return result.insertId;
    }

    // Update user information
    static async update(id, updates) {
        await db.query('UPDATE users SET ? WHERE id = ?', [updates, id]);
        return this.findById(id);
    }

    // Get all users
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    // Get user's order history
    static async getOrderHistory(userId) {
        const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        return rows;
    }

    // Save a new order
    static async saveOrder(order) {
        const [result] = await db.query('INSERT INTO orders SET ?', order);
        return result.insertId;
    }

    // Hash the password
    static async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    // Compare the password
    static async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
