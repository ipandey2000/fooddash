import { db } from '../database.js';

export class Restaurant {
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM restaurants WHERE id = ?', [id]);
        return rows[0];
    }

    static async save(restaurant) {
        const [result] = await db.query('INSERT INTO restaurants SET ?', restaurant);
        return result.insertId;
    }

    static async updateMenu(id, newMenu) {
        // Assuming newMenu is a JSON string or can be serialized into JSON
        await db.query('UPDATE restaurants SET menu = ? WHERE id = ?', [JSON.stringify(newMenu), id]);
        return this.findById(id);
    }
}
