const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  exitApp: () => ipcRenderer.invoke("exit-app"),
  runSync: () => ipcRenderer.invoke("sync:run"),
});

contextBridge.exposeInMainWorld("dbAPI", {
  getProducts: () => ipcRenderer.invoke("get-products"),
  getProductById: (id) => ipcRenderer.invoke("get-product-by-id", id),
  syncProducts: (products) => ipcRenderer.invoke("sync-products", products),
});
