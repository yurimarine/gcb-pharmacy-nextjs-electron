const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");
const { app } = require("electron");

let db;

async function initDb() {
  if (!app.isReady()) await app.whenReady();

  const userDataPath = app.getPath("userData");
  if (!fs.existsSync(userDataPath)) fs.mkdirSync(userDataPath, { recursive: true });

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
      volume_unit TEXT
    );

    CREATE TABLE IF NOT EXISTS inventories (
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

  return db;
}

function getDb() {
  if (!db) throw new Error("Database not initialized. Call initDb() first.");
  return db;
}

module.exports = { initDb, getDb };
