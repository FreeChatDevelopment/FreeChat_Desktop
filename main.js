/**
 * electron 工程文件
 */

const { app, BrowserWindow, Menu } = require('electron')
const Path = require('path')
const Url = require('url')

const mode = process.argv[2];
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 860,
    height: 640,
    titleBarStyle: 'hidden', // 隐藏标题栏
    center: true,     // 窗口居中
    webPreferences: {
      //   preload: Path.join(__dirname, 'preload.ts')
      nodeIntegration: true
    }
  })
  // 加载页面
  if (mode === 'dev') {
    mainWindow.loadURL('http://localhost:3000')
  } else {
    mainWindow.loadURL(Url.format({
      pathname: Path.join(__dirname, './build/index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  // 打开调试工具, 上线关闭
  mainWindow.webContents.openDevTools()

  // 当窗口关闭时触发事件
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const dockMenu = Menu.buildFromTemplate([
  {
    label: '新建窗口',
    click() { console.log('New Window') }
  }, {
    label: '设置',
    submenu: [
      { label: 'mac 1' },
      { label: 'mac 2' }
    ]
  }
])

// app.on('ready', createWindow)
app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu)
  }
}).then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
