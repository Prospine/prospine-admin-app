const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Function to open external URLs in default browser
    openExternal: (url) => ipcRenderer.invoke('open-external', url),
    // Function to handle webview navigation actions
    webviewAction: (action) => ipcRenderer.send('webview-action', action)
});
