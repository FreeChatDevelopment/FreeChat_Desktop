/**
 * electron main process
 */
import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import * as Path from 'path'

let mainWindow: BrowserWindow | null
const isDev = process.argv[2]
// 创建主窗口
function CreateWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    center: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      preload: Path.join(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://localhost:3000')
  } else {
    let dir = Path.join(__dirname, '../build/index.html')
    mainWindow.loadFile(`file://${dir}`)
  }
  // 窗口关闭
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function handleSetTitle(event: any, title: any) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents) as BrowserWindow || null
  win.setTitle(title)
  console.log(title, 'main')
}

function dockMenu() {
  const dockMenuList = Menu.buildFromTemplate([
    {
      label: 'Language',
      submenu: [
        {
          label: '简体中文',
          click() { console.log('简体中文') }
        },
        {
          label: 'English',
          click() { console.log('English') }
        }
      ]
    }
  ])
  return dockMenuList
}

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu())
  }
  ipcMain.on('set-title', handleSetTitle)
}).then(CreateWindow)

app.on('window-all-closed', () => {
  // 关闭所有窗口
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateWindow()
  }
})