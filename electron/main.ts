/**
 * electron main process
 */
import { app, BrowserWindow, ipcMain } from 'electron'
import * as Path from 'path'
class Main {
  private mainWindow!: BrowserWindow | null;

  public init() {
    app.whenReady().then(() => {
      ipcMain.on('set-title', this.handleSetTitle)
    }).then(() => this.createWindow())
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
  }
  // 窗口全部关闭
  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

  private onActivate() {
    console.log(!this.mainWindow)
    if (!this.mainWindow) {
      this.createWindow()
    }
  }

  private handleSetTitle(event: any, title: any) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents) as BrowserWindow || null
    win.setTitle(title)
    console.log(title, 'main')
  }

  private createWindow() {
    const isDev = process.argv[2]
    this.mainWindow = new BrowserWindow({
      width: 860,
      height: 640,
      titleBarStyle: 'hidden',    // 隐藏窗口标题栏
      center: true,               // 窗口剧中
      webPreferences: {
        nodeIntegration: true,    //  makes it possible to use `require` within our index.html
        preload: Path.join(__dirname, 'preload.js')
      }
    })
    if (isDev === 'dev') {
      this.mainWindow.webContents.openDevTools();
      this.mainWindow.loadURL('http://localhost:3000')
    } else {
      let dir = Path.join(__dirname, './build/index.html')
      this.mainWindow.loadFile(`file://${dir}`);
    }
    // 当窗口关闭时触发事件
    this.mainWindow.on('closed', () => {
      console.log(this.mainWindow, '关闭·')
      this.mainWindow = null
    })
  }
}

(new Main()).init()