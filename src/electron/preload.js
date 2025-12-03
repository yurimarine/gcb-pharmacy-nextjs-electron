const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  exitApp: () => ipcRenderer.invoke("exit-app"),
  getProductByBarcode: (barcode) =>
    ipcRenderer.invoke("get-product-by-barcode", barcode),
  createLocalTransaction: (payload) =>
    ipcRenderer.invoke("create-local-transaction", payload),
  syncNow: () => ipcRenderer.invoke("sync-now"),
});
