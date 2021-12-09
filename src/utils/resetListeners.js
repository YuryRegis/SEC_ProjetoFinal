const {ipcRenderer} = window.require('electron')


const listeners = [
    'encrypted-hash',
    'invalid-path',
    'selected-file',
    'adb-info-response',
]

function resetAllListeners() {
    listeners.map(listener => resetListener(listener))
}

function resetListener(channel){
    ipcRenderer.removeAllListeners(channel)
}

export default resetAllListeners