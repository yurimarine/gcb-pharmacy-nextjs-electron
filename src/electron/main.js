const { app, BrowserWindow, ipcMain } = require("electron");
const { initDb, getDb } = require("./db");
const path = require("path");
const syncAll = require("./sync/syncAll");

const PHARMACY_ID = 1;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!app.isPackaged) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "../out/index.html"));
  }
}

app.whenReady().then(async () => {
  await initDb();
  createWindow();
  try {
    // console.log("Starting initial sync...");
    await syncAll(PHARMACY_ID);
    // console.log("Sync complete!");
  } catch (err) {
    // console.error("Sync failed:", err);
  }
});

ipcMain.handle("get-products", () => {
  const db = getDb();
  return db.prepare("SELECT * FROM products").all();
});

ipcMain.handle("get-product-by-id", (event, id) => {
  const db = getDb();
  return db.prepare("SELECT * FROM products WHERE id = ?").get(id);
});

ipcMain.handle("search-products", (event, query) => {
  const db = getDb();
  return db
    .prepare("SELECT * FROM products WHERE product_name LIKE ?")
    .all(`%${query}%`);
});

ipcMain.handle("sync-products", (event, products) => {
  const db = getDb();
  const insert = db.prepare(
    `INSERT OR REPLACE INTO products
    (id, sku, product_name, barcode, unit_cost, packaging_amount, volume_amount, volume_unit)
    VALUES (@id, @sku, @product_name, @barcode, @unit_cost, @packaging_amount, @volume_amount, @volume_unit)`
  );
  const insertMany = db.transaction((products) => {
    for (const p of products) insert.run(p);
  });
  insertMany(products);
  return true;
});

ipcMain.handle("sync:run", async () => {
  try {
    await syncAll(PHARMACY_ID);
    return { status: "ok" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
});

ipcMain.handle("exit-app", () => app.quit());
