const { getDb } = require("../db");
const api = require("../utils/electronAxios");

async function syncInventory(PHARMACY_ID) {
  try {
    console.log(`Fetching inventory for pharmacy ${PHARMACY_ID}...`);

    const response = await api.get(`/terminal/inventory/${PHARMACY_ID}`);
    const inventories = response.data.data;

    console.log(`Fetched ${inventories.length} inventory items`);

    const db = getDb();

    const insertInventory = db.prepare(`
      INSERT OR REPLACE INTO inventories (
        id, product_id, pharmacy_id, stock_quantity,
        reorder_quantity, selling_price, markup_percentage,
        expiry_date, status
      ) VALUES (
        @id, @product_id, @pharmacy_id, @stock_quantity,
        @reorder_quantity, @selling_price, @markup_percentage,
        @expiry_date, @status
      )
    `);

    const tx = db.transaction((rows) => {
      for (const row of rows) insertInventory.run(row);
    });

    tx(inventories);

    console.log("Inventory synced successfully!");
  } catch (err) {
    console.error("Inventory sync failed:", err);
  }
}

module.exports = syncInventory;
