const { getDb } = require("../db");
const electronApi = require("../utils/electronAxios");

async function syncProducts() {
  try {
    console.log("Fetching products...");
    const response = await electronApi.get("/terminal/product/all");

    const products = response.data.data;
    console.log(`Fetched ${products.length} products`);

    const db = getDb();
    
    const insertProduct = db.prepare(`
      INSERT OR REPLACE INTO products (
        id, sku, product_name, barcode, unit_cost,
        packaging_amount, volume_amount, volume_unit
      ) VALUES (
        @id, @sku, @product_name, @barcode, @unit_cost,
        @packaging_amount, @volume_amount, @volume_unit
      )
    `);

    const tx = db.transaction((rows) => {
      for (const row of rows) insertProduct.run(row);
    });

    tx(products);

    console.log("Products synced successfully!");
  } catch (err) {
    console.error("Product sync failed:", err);
  }
}

module.exports = syncProducts;
