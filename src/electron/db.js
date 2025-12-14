const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const { app } = require("electron");

let db;

async function initDb() {
  if (!app.isReady()) await app.whenReady();

  const userDataPath = app.getPath("userData");
  if (!fs.existsSync(userDataPath))
    fs.mkdirSync(userDataPath, { recursive: true });

  const dbPath = path.join(userDataPath, "pos.db");
  console.log("Using database at:", dbPath);

  db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      sku TEXT UNIQUE,
      product_name TEXT,
      barcode TEXT UNIQUE,
      unit_cost REAL,
      packaging_amount INTEGER,
      volume_amount REAL,
      volume_unit TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inventories (
      id INTEGER PRIMARY KEY,
      product_id INTEGER,
      pharmacy_id INTEGER,
      stock_quantity INTEGER DEFAULT 0, -- cached value
      reorder_quantity INTEGER DEFAULT 0,
      selling_price REAL DEFAULT 0,
      markup_percentage REAL DEFAULT 0,
      expiry_date TEXT,
      status TEXT DEFAULT 'normal',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      pharmacy_id INTEGER,
      receipt_number TEXT,
      total_amount REAL DEFAULT 0,
      total_payment REAL DEFAULT 0,
      total_change REAL DEFAULT 0,
      transaction_date TEXT DEFAULT CURRENT_TIMESTAMP,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transaction_items (
      id INTEGER PRIMARY KEY,
      transaction_id INTEGER,
      product_id INTEGER,
      quantity INTEGER DEFAULT 0,
      price REAL DEFAULT 0,
      discount REAL DEFAULT 0,
      discounted_price REAL DEFAULT 0,
      subtotal REAL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inventory_movements (
      id INTEGER PRIMARY KEY,
      product_id INTEGER,
      pharmacy_id INTEGER,
      quantity_change INTEGER DEFAULT 0,
      movement_type TEXT, -- sale, restock, return, adjustment
      movement_date TEXT DEFAULT CURRENT_TIMESTAMP,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

  return db;
}

function getDb() {
  if (!db) throw new Error("Database not initialized. Call initDb() first.");
  return db;
}

module.exports = { initDb, getDb };
