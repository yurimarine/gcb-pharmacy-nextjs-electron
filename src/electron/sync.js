const axios = require("axios");
const db = require("./db");

async function syncInventory() {
  // Fetch all products (centralized)
  const productsResp = await axios.get("https://your-backend/api/products");
  const insertProduct = db.prepare(`
    INSERT OR REPLACE INTO products (id, sku, product_name, barcode, unit_cost, category_id, supplier_id, manufacturer_id, packaging_amount, volume_amount, volume_unit)
    VALUES (@id,@sku,@product_name,@barcode,@unit_cost,@category_id,@supplier_id,@manufacturer_id,@packaging_amount,@volume_amount,@volume_unit)
  `);
  const productTx = db.transaction((rows) => {
    for (const row of rows) insertProduct.run(row);
  });
  productTx(productsResp.data);

  // Fetch inventory for this pharmacy only
  const inventoryResp = await axios.get(
    `https://your-backend/api/inventories?pharmacy_id=${PHARMACY_ID}`
  );
  const insertInventory = db.prepare(`
    INSERT OR REPLACE INTO inventory (id, product_id, pharmacy_id, stock_quantity, reorder_quantity, selling_price, markup_percentage, expiry_date, status)
    VALUES (@id,@product_id,@pharmacy_id,@stock_quantity,@reorder_quantity,@selling_price,@markup_percentage,@expiry_date,@status)
  `);
  const inventoryTx = db.transaction((rows) => {
    for (const row of rows) insertInventory.run(row);
  });
  inventoryTx(inventoryResp.data);
}
