const OS = require('os')
const fs = require('fs')
const url = require('url')
const path = require("path")
const crypto = require('crypto')
const adb = require('./src/utils/adb')
const isDev = require("electron-is-dev")
const getDate = require('./src/utils/getDate')
const listFilesDir = require('./src/utils/readDir')
const { app, BrowserWindow, ipcMain, dialog } = require('electron')


function createWindow() {
    let appWindow = new BrowserWindow({
        width:800,
        height:600,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true
        }
    })

    // Fpr DEVELOP only
    appWindow.loadURL( isDev 
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '/resources/app/build/index.html')}`)

    // For PRODUCTION only
    //appWindow.loadURL(url.format({
    //    pathname: path.join(__dirname, './build/index.html'),
    //    protocol: 'file',
    //    slashes: true
    //}))

    ipcMain.on('open-dir-dialog', (event, arg) => {
        const dir = dialog.showOpenDialogSync({
            properties: ['openDirectory']
        })
        if(!dir) return
        const channel = arg || 'selected-dir'
        dir.length > 0 && event.sender.send(channel, dir[0])
    })

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

    ipcMain.on('generate-hash-dir', async(event, args) => {
        const { path, destiny } = args
        const FilesDir = await listFilesDir(path)
        
        try {
            let buffer = ''
            FilesDir.map(dir => {
                const _dir = dir.replace(/\\/g, '/')
                const file = fs.readFileSync(_dir)
                const hash = crypto.createHash('sha256').update(file).digest('hex')
                buffer += `${_dir}; ${hash}\n`
            })
            const _destiny = `${destiny}/hash`
            event.sender.send('write-data', {path: _destiny, content: buffer})
        } catch(err) {
            event.sender.send('throw-error', 'Algo de errado não está certo!')
            event.sender.send('throw-error', 'Verifique o diretório informado.')
        }
    })

    ipcMain.on('adb-get-info', (event, _) => {
        const query = 'monitor-response'
        const attr = [
            {cmd: 'adb shell getprop ro.product.manufacturer', label: 'Fabricante'},
            {cmd: 'adb shell getprop ro.product.model', label: 'Modelo'},
            {cmd: 'adb shell getprop ril.serialnumber', label: 'S/N'},
            {cmd: 'adb shell service call iphonesubinfo 1', label: 'IMEI'},
            {cmd: 'adb shell getprop ro.build.version.release', label: 'Android'},
        ]
        const lastItem = attr.length - 1
        attr.map((item, index) => adb(item.cmd, item.label, event, query, (index===lastItem)))
    })

    ipcMain.on('adb-get-global', (event) => {
        const command = 'adb shell settings list global'
        const label = 'Informações Globais'
        adb(command, label, event, 'monitor-response', true)
    })

    ipcMain.on('adb-get-activity', (event) => {
        const command = 'adb shell dumpsys activity'
        const label = 'Atividade'
        adb(command, label, event, 'monitor-response', true)
    })

    ipcMain.on('adb-get-contacts', (event) => {
        const command = 'adb shell dumpsys account'
        const label = 'Contas'
        adb(command, label, event, 'monitor-response', true)
    })

    ipcMain.on('write-file', async (event, {path, content}) => {
        const date = getDate()
        const _path = `${path}_${date}.txt`

        try {
            fs.writeFileSync(_path, content, (error) => {
                throw error
            })
            event.sender.send('throw-success', `Arquivo criado com sucesso!`)
        } catch (error) {
            if(error?.code === 'EPERM') {
                event.sender.send('throw-error', 'Sem permissão de escrita.')
                event.sender.send('monitor-response', {message: error?.message, isFinished: true})
                return
            }
            event.sender.send('throw-error', 'Algo de errado não está certo!')
            event.sender.send('throw-error', 'Verifique o diretório informado.')
        }   
    })

    appWindow.on('closed', () => appWindow = null)
}

ipcMain.on('close-main-window' , () => OS.platform!=='darwin' && app.quit())

app.on('ready', createWindow) 