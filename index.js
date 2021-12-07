const OS = require('os')
const { app, BrowserWindow, ipcMain, dialog } = require('electron')

//require('@electron/remote/main').initialize()


function createWindow() {
    const appWindow = new BrowserWindow({
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

    appWindow.loadURL('http://localhost:3000')

    //ipcMain.on('open-file-dialog', (event) => {
    //    const isMacOs = OS.platform() === 'darwin'
    //
    //    dialog.showOpenDialog({
    //        properties: isMacOs 
    //            ? ['openFile', 'openDirectory']
    //            : ['openFile']
    //    }, (files) => {
    //        if(files) {
    //            event.sender.send('selected-file', files[0])
    //        }
    //    })
    //})
}

ipcMain.on('close-main-window', () => app.quit())

app.on('ready', createWindow) 