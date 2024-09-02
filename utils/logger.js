import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handling __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, '../logs/orders.log');

export const logOrderDetails = (order) => {
    const logEntry = `[${new Date().toISOString()}] Order ID: ${order.id}, User ID: ${order.userId}, Status: ${order.status}\n`;
    fs.appendFileSync(logFilePath, logEntry, (err) => {
        if (err) throw err;
    });
};
