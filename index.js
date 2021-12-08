const OS = require('os')
const fs = require('fs')
const url = require('url')
const path = require("path")
const crypto = require('crypto')
const isDev = require("electron-is-dev")
const { app, BrowserWindow, ipcMain, dialog } = require('electron')


process.setMaxListeners(20);

function createWindow() {
    let appWindow = new BrowserWindow({
        width:800,
        height:600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
        }
    })

    //appWindow.loadURL( isDev 
    //    ? 'http://localhost:3000'
    //    : `file://${path.join(__dirname, '/resources/app/build/index.html')}`)

    appWindow.loadURL(url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file',
        slashes: true
    }))

    ipcMain.on('open-file-dialog', (event) => {
        const isMacOs = OS.platform() === 'darwin'
    
        const file = dialog.showOpenDialogSync({
            properties: isMacOs 
                ? ['openFile', 'openDirectory']
                : ['openFile']
            }, (files) => {
                if(files) 
                    return event.sender.send('selected-file', files[0])
        })
        if(!file) return
        file[0] && event.sender.send('selected-file', file[0])
    })

    ipcMain.on('generate-hash', (event, arg) => {
        try {
            const file = fs.readFileSync(arg)
            const sha256 = crypto.createHash('sha256')
            const encryptFile = sha256.update(file).digest('hex')

            event.sender.send('encrypted-hash', encryptFile)
        } catch (error) {
            const message = 'Arquivo ou diretório inválido!'
            event.sender.send('invalid-path', message)
        }
    })

    appWindow.on('closed', () => appWindow = null)
}

ipcMain.on('close-main-window', () => OS.platform!=='darwin' && app.quit())

app.on('ready', createWindow) 