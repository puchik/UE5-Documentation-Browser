// include the Node.js 'path' module at the top of your file
const path = require('path')
const { app, BrowserWindow, BrowserView, ipcMain } = require('electron')

const TITLEBAR_HEIGHT = 45 + 25;
const MAIN_URL = 'https://www.unrealengine.com/en-US/search?x=0&y=0&filter=C%2B%2B%20API&keyword=';
const DEFAULT_HEIGHT = 950;
const DEFAULT_WIDTH = 850;

const createWindow = () => {
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        webPreferences: {
          preload: path.join(__dirname, 'renderer.js')
        },
        icon: path.join(__dirname, 'icons/app-icon.ico'),
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#000925',
            symbolColor: '#999999'
        }
    });

    const browserView = new BrowserView({ 
        webPreferences: { 
            sandbox: true, 
            contextIsolation: true, 
            webviewTag: true, 
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.setBrowserView(browserView);
    win.loadFile('index.html');
    win.setAppDetails({
        appId: "UE5DocBrowser"
    })

    // Position the titlebar
    const contentBounds = win.getContentBounds();
    browserView.setBounds({ x: 0, y: TITLEBAR_HEIGHT, width: contentBounds.width, height: contentBounds.height - TITLEBAR_HEIGHT });
    browserView.setAutoResize({ width: true, height: true });

    browserView.webContents.loadURL(MAIN_URL);

    // Disallow new windows being opened
    // TODO: Allow setting to enable multiple windows?
    browserView.webContents.setWindowOpenHandler(( { url }) => {
        browserView.webContents.loadURL(url);
        return {
            action: 'deny'
        }
    })

    // Set up buttons
    ipcMain.handle('goBack', (event, ...args) => {
        browserView.webContents.goBack();
    });
    ipcMain.handle('goForward', (event, ...args) => {
        browserView.webContents.goForward();
    });
    ipcMain.handle('goHome', (event, ...args) => {
        browserView.webContents.loadURL(MAIN_URL);
    });
    ipcMain.handle('pin', (event, ...args) => {
        win.setAlwaysOnTop(true, "floating");
        win.setVisibleOnAllWorkspaces(true);
        win.setFullScreenable(false);
    });
    ipcMain.handle('unpin', (event, ...args) => {
        win.setAlwaysOnTop(false, "floating");
        win.setVisibleOnAllWorkspaces(false);
        win.setFullScreenable(true);
    });
    
    // Handle title changes
    ipcMain.handle('updateTitle', (event, ...args) => {
        win.webContents.send('updateTitle', args[0]);
    });
})
