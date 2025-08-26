const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');

const PARTITION = 'persist:prospine';
const START_URL = 'https://www.prospine.in/admin';
const ALLOWED_ORIGINS = new Set(['https://www.prospine.in', 'https://prospine.in']);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon: path.join(__dirname, 'icon.png'),
    titleBarStyle: 'default',
    webPreferences: {
      partition: PARTITION,            // persistent session
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(START_URL);

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => { mainWindow = null; });

  // Open all non-allowed origins in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const origin = new URL(url).origin;
      if (ALLOWED_ORIGINS.has(origin)) return { action: 'allow' };
    } catch { }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Block in-window navigations to unapproved origins
  mainWindow.webContents.on('will-navigate', (e, url) => {
    const origin = (() => { try { return new URL(url).origin; } catch { return ''; } })();
    if (!ALLOWED_ORIGINS.has(origin)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  // Optional: Ctrl/Cmd+R = hard reload current page (keeps cookies/localStorage)
  mainWindow.webContents.on('before-input-event', (event, input) => {
    const isReload = (input.key.toLowerCase() === 'r' && (input.control || input.meta));
    if (isReload) {
      event.preventDefault();
      mainWindow.webContents.reloadIgnoringCache();
    }
  });

  // Tight permissions for this partition
  const ses = session.fromPartition(PARTITION);
  ses.setPermissionRequestHandler((webContents, permission, callback, details) => {
    const origin = (details && details.requestingUrl) ? new URL(details.requestingUrl).origin : '';
    const allow = ALLOWED_ORIGINS.has(origin) && ['notifications', 'geolocation'].includes(permission);
    callback(allow);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
