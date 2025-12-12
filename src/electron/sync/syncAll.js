const syncProducts = require("./syncProducts"); 
const syncInventory = require("./syncInventory");

async function syncAll(PHARMACY_ID) {
  await syncProducts();
  await syncInventory(PHARMACY_ID);
}

module.exports = syncAll;
