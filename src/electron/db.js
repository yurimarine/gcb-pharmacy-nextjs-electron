// electron/db.js
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const db = new Database(path.join(dataDir, 'pos.db'));

db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  sku TEXT UNIQUE,
  product_name TEXT,
  barcode TEXT UNIQUE,
  unit_cost REAL,
  category_id INTEGER,
  supplier_id INTEGER,
  manufacturer_id INTEGER,
  packaging_amount INTEGER,
  volume_amount REAL,
  volume_unit TEXT
);

CREATE TABLE IF NOT EXISTS inventory (
  id INTEGER PRIMARY KEY,
  product_id INTEGER,
  pharmacy_id INTEGER,
  stock_quantity INTEGER DEFAULT 0,
  reorder_quantity INTEGER DEFAULT 0,
  selling_price REAL DEFAULT 0,
  markup_percentage REAL DEFAULT 0,
  expiry_date TEXT,
  status TEXT DEFAULT 'normal'
);
`);

module.exports = db;
